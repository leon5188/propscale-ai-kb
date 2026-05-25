export async function getGHLContact(contactId: string) {
  const apiKey = process.env.GHL_API_KEY || process.env.GHL_API_TOKEN;
  
  const res = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-07-28',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(`[GHL API] Failed to fetch contact ${contactId}:`, error);
    return null;
  }

  return res.json();
}

export async function getGHLLocation(locationId: string) {
  const apiKey = process.env.GHL_API_KEY || process.env.GHL_API_TOKEN;
  
  const res = await fetch(`https://services.leadconnectorhq.com/locations/${locationId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-07-28',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(`[GHL API] Failed to fetch location ${locationId}:`, error);
    return null;
  }

  return res.json();
}

export async function getGHLOpportunities() {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  const res = await fetch(`https://services.leadconnectorhq.com/opportunities/search?location_id=${locationId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-07-28',
      'Accept': 'application/json'
    },
    next: { revalidate: 60 } // Cache for 60 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  return res.json();
}

export async function getGHLPipelines() {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  const res = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-07-28',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch pipelines');
  }

  return res.json();
}
