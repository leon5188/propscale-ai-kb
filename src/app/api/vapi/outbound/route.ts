import { NextResponse } from 'next/server';
import { getVapiSystemPrompt } from '@/lib/vapiPrompt';

/**
 * API Route to trigger a Vapi outbound call from a GoHighLevel Webhook.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Data typically sent from GHL Webhook
    // Note: GHL usually sends lead data in a specific structure. 
    // We expect these fields or mappings:
    const { 
      first_name, 
      last_name, 
      phone, 
      agent_name = "Sarah", 
      company_name = "PropScale Realty", 
      city = "the local area" 
    } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Missing phone number' }, { status: 400 });
    }

    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;

    if (!VAPI_API_KEY) {
      return NextResponse.json({ error: 'VAPI_API_KEY not configured' }, { status: 500 });
    }

    const systemPrompt = getVapiSystemPrompt(agent_name, company_name, city);

    // Call Vapi Outbound API
    const vapiResponse = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`,
      },
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID, // Your Vapi provisioned number ID
        customer: {
          number: phone,
          name: `${first_name} ${last_name}`.trim(),
        },
        assistant: {
          firstMessage: `Hi ${first_name}! This is the AI assistant for ${agent_name} at ${company_name}. How can I help you with your property search today?`,
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
            voiceId: "sarah", // Or your preferred voice ID
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
