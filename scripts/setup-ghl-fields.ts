import dotenv from 'dotenv';

dotenv.config();

const GHL_API_KEY = process.env.GHL_API_KEY || process.env.GHL_API_TOKEN;

const REQUIRED_FIELDS = [
  { name: 'Zestimate', dataType: 'TEXT', placeholder: 'e.g. $450,000' },
  { name: 'Beds', dataType: 'TEXT', placeholder: 'e.g. 3' },
  { name: 'Baths', dataType: 'TEXT', placeholder: 'e.g. 2' },
  { name: 'SqFt', dataType: 'TEXT', placeholder: 'e.g. 1,800' },
  { name: 'Year Built', dataType: 'TEXT', placeholder: 'e.g. 1995' },
  { name: 'PropScale Score', dataType: 'NUMERICAL', placeholder: '0-100' },
  { name: 'PropScale Intelligence', dataType: 'LARGE_TEXT', placeholder: 'Deep insights from Exa.ai' }
];

async function setupFields(locationId: string) {
  if (!locationId) {
    console.error('Usage: ts-node scripts/setup-ghl-fields.ts <locationId>');
    process.exit(1);
  }

  console.log(`[Setup] Starting field creation for location: ${locationId}...`);

  for (const field of REQUIRED_FIELDS) {
    try {
      const response = await fetch(`https://services.leadconnectorhq.com/locations/${locationId}/customFields`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: field.name,
          dataType: field.dataType,
          placeholder: field.placeholder,
          model: 'contact'
        })
      });

      interface GHLResponse { id?: string; message?: string }
      const data = await response.json() as GHLResponse;

      if (response.ok) {
        console.log(`✅ Created field: ${field.name} (ID: ${data.id})`);
      } else if (data.message && data.message.includes('already exists')) {
        console.log(`ℹ️ Field already exists: ${field.name}`);
      } else {
        console.error(`❌ Failed to create ${field.name}:`, data);
      }
    } catch (error) {
      console.error(`❌ Error creating ${field.name}:`, error);
    }
  }

  console.log('\n[Setup] Done! Copy the IDs above into your environment variables if needed.');
}

const locationId = process.argv[2];
setupFields(locationId);
