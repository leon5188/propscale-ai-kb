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
