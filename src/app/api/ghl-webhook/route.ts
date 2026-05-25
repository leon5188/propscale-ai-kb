import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getIndex } from '@/lib/pinecone';
import { 
  getGHLContact, 
  getGHLLocation, 
  getGHLOpportunitiesByContact, 
  updateGHLOpportunity,
  getGHLCustomFields,
  getGHLMessages
} from '@/lib/ghl';

const GHL_API_TOKEN = process.env.GHL_API_TOKEN;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    console.error("[GHL Webhook] Missing OPENAI_API_KEY");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  try {
    const body = await req.json();
    
    // Extract Contact and Location IDs
    const contactId = body.contact_id || (body.customData && body.customData.contact_id);
    const locationId = body.location_id || (body.location && body.location.id) || (body.customData && body.customData.location_id);
    
    let incomingMessage = "";
    if (body.customData) {
      incomingMessage = body.customData.message || body.customData[" message"] || body.customData.body || "";
    }
    if (!incomingMessage && body.triggerData) {
      incomingMessage = body.triggerData.message || body.triggerData.body || "";
    }
    if (!incomingMessage) {
      incomingMessage = body.message || body.body || "";
    }

    if (!contactId || !incomingMessage) {
      return NextResponse.json({ error: "Missing contact ID or message" }, { status: 400 });
    }

    console.log(`[GHL Webhook] Received message from ${contactId} in ${locationId}: ${incomingMessage}`);

    // ==========================================
    // 0.5 HUMAN INTERVENTION DETECTION
    // ==========================================
    try {
      const messagesData = await getGHLMessages(contactId);
      if (messagesData && messagesData.messages && messagesData.messages.length > 0) {
        const lastMessage = messagesData.messages[0]; // Most recent first
        // If the last message was outbound (sent by us), it means either:
        // 1. A human agent just replied manually.
        // 2. The AI just replied and this is a race condition.
        // In either case, we should NOT send another AI message.
        if (lastMessage.direction === 'outbound') {
          console.log(`[Human Detection] Last message to ${contactId} was outbound. AI standing down.`);
          return NextResponse.json({ success: true, skipped: true, reason: "Last message was outbound" });
        }
      }
    } catch (msgError) {
      console.error("[Human Detection Error] Skipping check:", msgError);
    }

    // ==========================================
    // 1.0 DYNAMIC IDENTITY & PROPERTY DATA
    // ==========================================
    let agentName = "the agent";
    let companyName = "PropScale Realty";
    let propertyInfo = "";

    try {
      // Parallel fetch for better performance: Identity + Property Metadata
      const [contactData, locationData, customFieldsMetadata] = await Promise.all([
        getGHLContact(contactId),
        locationId ? getGHLLocation(locationId) : Promise.resolve(null),
        locationId ? getGHLCustomFields(locationId) : Promise.resolve(null)
      ]);

      if (locationData && locationData.location) {
        companyName = locationData.location.name || companyName;
        // Try to identify agent name
        agentName = locationData.location.firstName || "the team";
      }

      if (contactData && contactData.contact) {
        const contact = contactData.contact;
        const address = contact.address1 || "";
        const contactCustomFields = contact.customFields || [];
        
        // 1.0.1 DYNAMIC FIELD MAPPING (Scalable for B2B)
        // Find field IDs by name so we don't hardcode them
        const fieldMap: Record<string, string> = {};
        if (customFieldsMetadata && customFieldsMetadata.customFields) {
          const namesToMatch = ['Zestimate', 'Beds', 'Baths', 'SqFt', 'Year Built'];
          for (const fieldMeta of customFieldsMetadata.customFields) {
            const matchedName = namesToMatch.find(n => fieldMeta.name.toLowerCase().includes(n.toLowerCase()));
            if (matchedName) {
              fieldMap[fieldMeta.id] = matchedName;
            }
          }
        }

        let fieldDetails = [];
        let hasZestimate = false;
        if (address) fieldDetails.push(`Address: ${address}`);
        
        for (const field of contactCustomFields) {
          const fieldName = fieldMap[field.id];
          if (fieldName) {
            fieldDetails.push(`${fieldName}: ${field.value}`);
            if (fieldName === 'Zestimate' && field.value) hasZestimate = true;
          }
        }
        
        if (fieldDetails.length > 0) {
          let statusInstruction = "";
          if (!hasZestimate && address) {
            statusInstruction = "\n(CRITICAL: The Zillow data is currently being pulled by our engine. Tell the user you are fetching their live property value right now and will have it in about 30 seconds. Do not ask for their address again.)";
          } else if (hasZestimate) {
            statusInstruction = "\n(CRITICAL: You MUST use the Zestimate value provided above. Do not say you need to check.)";
          }

          propertyInfo = `\n\nLEAD PROPERTY DATA:\n${fieldDetails.join('\n')}${statusInstruction}`;
        }
      }
    } catch (dataError) {
      console.error("[GHL Data Error] Failed to fetch dynamic context:", dataError);
    }

    // ==========================================
    // 1.1 STOP/BOUNCE MESSAGE FILTERING
    // ==========================================
    const normalizedMessage = incomingMessage.toLowerCase().trim();
    if (normalizedMessage === 'stop' || 
        normalizedMessage.includes('mailbox that is not actively monitored') || 
        normalizedMessage.includes('not correspond to a valid address')) {
      console.log(`[GHL Webhook] Ignored DND/bounce message from ${contactId}`);
      return NextResponse.json({ success: true, ignored: true, reason: "DND or bounce message detected" });
    }

    // ==========================================
    // 1.5 KNOWLEDGE BASE RETRIEVAL (RAG)
    // ==========================================
    let contextText = "";
    try {
      const index = getIndex();
      if (index) {
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: incomingMessage,
        });
        const embedding = embeddingResponse.data[0].embedding;

        const queryResponse = await index.query({
          vector: embedding,
          topK: 3,
          includeMetadata: true,
        });

        const relevantChunks = queryResponse.matches
          .filter(match => match.score && match.score > 0.3)
          .map(match => (match.metadata as { text?: string })?.text)
          .filter(Boolean) as string[];
        
        if (relevantChunks.length > 0) {
          contextText = "Use the following local real estate knowledge if relevant:\n" + relevantChunks.join("\n---\n");
        }
      }
    } catch (ragError) {
      console.error("[RAG Error] Failed to retrieve context:", ragError);
    }

    // ==========================================
    // 2. REAL AI LOGIC (OpenAI Integration)
    // ==========================================
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `You are the specialized AI real estate assistant for ${agentName} at ${companyName}. 

Your Role:
- You represent the agent/brokerage, NOT a software company. 
- Your goal is to be helpful, warm, and professional.
- Guide the conversation toward booking a 15-minute consultation or a property viewing.
- Tone: Concise, local, and human-like.

Key Context:
- Agent/Team: ${agentName}
- Company: ${companyName}
${propertyInfo}

${contextText}` 
        },
        { role: "user", content: incomingMessage }
      ],
    });

    const aiResponseText = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    
    // ==========================================
    // 3. PIPELINE AUTOMATION (Auto-Move Lead)
    // ==========================================
    try {
      const opportunitiesData = await getGHLOpportunitiesByContact(contactId);
      if (opportunitiesData && opportunitiesData.opportunities && opportunitiesData.opportunities.length > 0) {
        const opp = opportunitiesData.opportunities[0];
        const pipelineId = opp.pipelineId;
        
        // Define target stages (Mapping for the Real Estate Pipeline)
        const STAGE_CONTACTED = 'deb47d38-5860-4300-8417-1059082e8a67';
        const STAGE_AI_QUALIFIED = '7f90275e-28c4-4681-bfd0-ceae46e6feba';

        let targetStage = STAGE_CONTACTED;
        
        // Detect high intent for "AI Qualified" movement
        const lowAiResponse = aiResponseText.toLowerCase();
        if (lowAiResponse.includes('booked') || 
            lowAiResponse.includes('calendar') || 
            lowAiResponse.includes('appointment')) {
          targetStage = STAGE_AI_QUALIFIED;
        }

        if (opp.pipelineStageId !== targetStage) {
          await updateGHLOpportunity(pipelineId, opp.id, targetStage);
        }
      }
    } catch (pipelineError) {
      console.error("[Pipeline Error] Failed to move opportunity:", pipelineError);
    }

    // ==========================================
    // 4. Send the reply back to GHL
    // ==========================================
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_TOKEN}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        type: "SMS",
        contactId: contactId,
        message: aiResponseText
      })
    });

    const responseData = await ghlResponse.json();

    if (!ghlResponse.ok) {
      return NextResponse.json({ success: false, error: "GHL API Error", details: responseData }, { status: 200 });
    }

    return NextResponse.json({ success: true, messageId: responseData.id || "sent" });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Webhook Error]", error);
    return NextResponse.json({ error: "Internal Server Error", message }, { status: 500 });
  }
}
