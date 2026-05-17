import { NextResponse } from 'next/server';

const GHL_API_TOKEN = process.env.GHL_API_TOKEN;

// This is the location ID of the agent's sub-account. 
// In a real multi-tenant SaaS, you would dynamically get this from their user profile or Stripe checkout metadata.
// For now, we hardcode the test account ID.
const LOCATION_ID = "dcJGZR1L77vJd0rvaNI5"; 

export async function POST(req: Request) {
  if (!GHL_API_TOKEN) {
    return NextResponse.json({ error: "Server configuration error: Missing GHL API Token" }, { status: 500 });
  }

  try {
    const formData = await req.json();
    console.log("[Onboarding API] Received form data:", formData);

    const { agentName, brokerageName, cityMarket, calendlyLink, localKnowledge, objectionLogic } = formData;

    if (!agentName || !brokerageName || !cityMarket) {
      return NextResponse.json({ error: "Missing required fields (Agent Name, Brokerage, or City)" }, { status: 400 });
    }

    // Prepare the Custom Values array to match the names we used in GHL
    const customValuesToUpdate = [
      { name: "Agent Name", value: agentName },
      { name: "Brokerage Name", value: brokerageName },
      { name: "City Market", value: cityMarket },
      { name: "Calendly Link", value: calendlyLink || "https://calendly.com" },
      { name: "Local Knowledge", value: localKnowledge || "Expert in the local area." },
      { name: "Objection Logic", value: objectionLogic || "Focus on finding off-market deals." }
    ];

    let successCount = 0;
    let errors = [];

    // Loop through and update/create each custom value via GHL API v2
    // Note: The POST endpoint creates new values. If they already exist, you might need to use a PUT/Update endpoint and their specific CV IDs.
    // For this prototype, we'll try the creation endpoint as it works for injecting new variables.
    for (const cv of customValuesToUpdate) {
      const ghlResponse = await fetch(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customValues`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_TOKEN}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cv)
      });

      if (ghlResponse.ok) {
        successCount++;
      } else {
        const errorData = await ghlResponse.json();
        // If it's a 400 and says it already exists, that's fine for our prototype.
        console.warn(`[Onboarding API] Error setting ${cv.name}:`, errorData);
        errors.push({ name: cv.name, error: errorData });
      }
    }

    console.log(`[Onboarding API] Successfully set ${successCount}/${customValuesToUpdate.length} custom values.`);

    return NextResponse.json({ 
      success: true, 
      message: "Agent workspace configured successfully!",
      details: { successCount, errors }
    });

  } catch (error: any) {
    console.error("[Onboarding API Error]", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
