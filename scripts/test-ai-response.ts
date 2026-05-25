import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

async function testAIReply() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Mock data that would normally come from GHL + Zillow Service
  const agentName = "Sarah";
  const companyName = "PropScale Realty";
  const propertyInfo = `
LEAD PROPERTY DATA:
Address: 123 Main St, Alhambra, CA
Property Insight (field_zestimate): $850,000
Property Insight (field_sqft): 2,100
Property Insight (field_beds): 4
(Note: Use this data to provide instant value if they ask about their home.)
  `;

  const incomingMessage = "My house is at 123 Main St. How much is it worth right now?";

  console.log("--- TEST INPUT ---");
  console.log(`User: ${incomingMessage}`);
  console.log(`Context: Acting as ${agentName} at ${companyName}`);
  console.log("------------------\n");

  try {
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
${propertyInfo}` 
        },
        { role: "user", content: incomingMessage }
      ],
    });

    console.log("--- AI RESPONSE ---");
    console.log(completion.choices[0].message.content);
    console.log("-------------------");

  } catch (error) {
    console.error("Test failed:", error);
  }
}

testAIReply();
