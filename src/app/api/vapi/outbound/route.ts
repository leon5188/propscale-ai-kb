import { NextResponse } from 'next/server';
import { getVapiSystemPrompt } from '@/lib/vapiPrompt';
import { 
  getGHLContact, 
  getGHLLocation, 
  getGHLCustomFields 
} from '@/lib/ghl';

/**
 * API Route to trigger a Vapi outbound call from a GoHighLevel Webhook.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Data typically sent from GHL Webhook
    const phone = body.phone || (body.customData && body.customData.phone);
    const contactId = body.contact_id || body.id || (body.customData && body.customData.contact_id);
    const locationId = body.location_id || (body.location && body.location.id) || (body.customData && body.customData.location_id);
    const firstName = body.first_name || (body.customData && body.customData.first_name) || "there";
    const lastName = body.last_name || (body.customData && body.customData.last_name) || "";

    if (!phone) {
      return NextResponse.json({ error: 'Missing phone number' }, { status: 400 });
    }

    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;

    if (!VAPI_API_KEY) {
      return NextResponse.json({ error: 'VAPI_API_KEY not configured' }, { status: 500 });
    }

    // ==========================================
    // DYNAMIC IDENTITY & PROPERTY DATA LOOKUP
    // ==========================================
    let agentName = "the agent";
    let companyName = "PropScale Realty";
    let city = "the local area";
    let propertyInfo = "";

    try {
      const [contactData, locationData, customFieldsMetadata] = await Promise.all([
        contactId ? getGHLContact(contactId) : Promise.resolve(null),
        locationId ? getGHLLocation(locationId) : Promise.resolve(null),
        locationId ? getGHLCustomFields(locationId) : Promise.resolve(null)
      ]);

      if (locationData && locationData.location) {
        companyName = locationData.location.name || companyName;
        agentName = locationData.location.firstName || "the team";
        city = locationData.location.city || city;
      }

      if (contactData && contactData.contact) {
        const contact = contactData.contact;
        const address = contact.address1 || "";
        const contactCustomFields = contact.customFields || [];
        
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

        const fieldDetails = [];
        if (address) fieldDetails.push(`Address: ${address}`);
        
        for (const field of contactCustomFields) {
          const fieldName = fieldMap[field.id];
          if (fieldName && field.value) {
            fieldDetails.push(`${fieldName}: ${field.value}`);
          }
        }
        
        if (fieldDetails.length > 0) {
          propertyInfo = fieldDetails.join(', ');
        }
      }
    } catch (dataError) {
      console.error("[Vapi Data Error] Failed to fetch context:", dataError);
    }

    const systemPrompt = getVapiSystemPrompt(agentName, companyName, city, propertyInfo);

    // Call Vapi Outbound API
    const vapiResponse = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`,
      },
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        customer: {
          number: phone,
          name: `${firstName} ${lastName}`.trim(),
        },
        assistant: {
          firstMessage: `Hi ${firstName}! This is the AI assistant for ${agentName} at ${companyName}. How can I help you with your property at ${propertyInfo.split(',')[0] || 'your area'} today?`,
          model: {
            provider: "openai",
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
            ],
          },
          voice: {
            provider: "elevenlabs",
            voiceId: "sarah", 
          },
        },
      }),
    });

    const result = await vapiResponse.json();

    if (!vapiResponse.ok) {
      console.error('Vapi API Error:', result);
      return NextResponse.json({ error: 'Failed to trigger Vapi call', details: result }, { status: vapiResponse.status });
    }

    return NextResponse.json({ success: true, callId: result.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error('Outbound Call Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
