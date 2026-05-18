import { NextResponse } from 'next/server';

const GHL_API_TOKEN = process.env.GHL_API_TOKEN;
const LOCATION_ID = "dcJGZR1L77vJd0rvaNI5"; // propscale ai

export async function GET() {
  if (!GHL_API_TOKEN) {
    return NextResponse.json({ error: "GHL API Token missing" }, { status: 500 });
  }

  try {
    // 1. Fetch Total Contacts
    const contactsRes = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${LOCATION_ID}&limit=1`, {
      headers: {
        'Authorization': `Bearer ${GHL_API_TOKEN}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });
    const contactsData = await contactsRes.json();
    const totalLeads = contactsData.meta?.total || 0;

    // 2. Fetch Location Info (for health check)
    const locationRes = await fetch(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}`, {
      headers: {
        'Authorization': `Bearer ${GHL_API_TOKEN}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });
    const isGhlConnected = locationRes.ok;

    // 3. Mock AI & Appointment data (In a full app, you'd query DB or GHL Appointments API)
    return NextResponse.json({
      totalLeads,
      aiRepliesToday: Math.floor(Math.random() * 5) + 3, // Mocking activity
      appointmentsBooked: 2,
      systemHealth: {
        ghl: isGhlConnected ? "connected" : "error",
        vercel: "online",
        pinecone: process.env.PINECONE_API_KEY ? "active" : "offline"
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
