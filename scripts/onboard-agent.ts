import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function onboardAgent() {
  const args = process.argv.slice(2);
  const params: Record<string, string> = {};

  // Simple parser: --key value
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      params[args[i].replace('--', '')] = args[i + 1];
      i++;
    }
  }

  const { locationId, agentName, companyName, voice } = params;

  if (!locationId) {
    console.error('❌ Error: --locationId is required.');
    console.log('Usage: npx ts-node scripts/onboard-agent.ts --locationId <ID> --agentName "Name" --company "Co" --voice "Style"');
    process.exit(1);
  }

  console.log(`🚀 Onboarding agent for location: ${locationId}...`);

  try {
    const settings = await prisma.locationSettings.upsert({
      where: { id: locationId },
      update: {
        agentName: agentName || undefined,
        companyName: companyName || undefined,
        brandVoiceProfile: voice || undefined,
      },
      create: {
        id: locationId,
        agentName: agentName || 'the agent',
        companyName: companyName || 'PropScale Realty',
        brandVoiceProfile: voice || 'Direct, professional, and compressed.',
      },
    });

    console.log('\n✅ Onboarding Complete!');
    console.log('---------------------------');
    console.log(`Location ID: ${settings.id}`);
    console.log(`Agent Name:  ${settings.agentName}`);
    console.log(`Company:     ${settings.companyName}`);
    console.log(`Brand Voice: ${settings.brandVoiceProfile}`);
    console.log('---------------------------');
    console.log('The AI will now automatically use these settings for this location.');

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

onboardAgent();
