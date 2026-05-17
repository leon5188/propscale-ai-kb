import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const GHL_API_TOKEN = process.env.GHL_API_TOKEN;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const contactId = body.contact_id || (body.customData && body.customData.contact_id);
    
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

    console.log(`[GHL Webhook] Received message from ${contactId}: ${incomingMessage}`);

    // ==========================================
    // 2. MOCK AI LOGIC (Bypassing OpenAI 429 Error)
    // ==========================================
    /*
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `You are the specialized AI real estate assistant...` 
        },
        { role: "user", content: incomingMessage }
      ],
    });
    const aiResponseText = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    */
    
    const aiResponseText = "I'll have Peifeng pull a custom list of off-market and active listings in Alhambra for you right away! What's your ideal budget and number of bedrooms? (Note: OpenAI is currently refreshing its quota, this is a simulated smart response.)";

    console.log(`[AI Logic] Simulated GPT Response: ${aiResponseText}`);

    // ==========================================
    // 3. Send the reply back to GHL
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
      console.error("[GHL API Error]", responseData);
      return NextResponse.json({ error: "Failed to send message via GHL API", details: responseData }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: responseData.id || "sent" });

  } catch (error: any) {
    console.error("[Webhook Error]", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      message: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
