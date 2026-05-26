import OpenAI from 'openai';

const EXA_API_KEY = process.env.EXA_API_KEY;

export async function getLeadIntelligence(address: string) {
  if (!EXA_API_KEY) {
    console.warn('[Intelligence] EXA_API_KEY not set. Skipping deep insights.');
    return null;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log(`[Intelligence] Running deep search for: ${address}`);

  try {
    // Stage 1: Exa Deep Search
    // 1. Search for renovation permits or recent work
    // 2. Search for local school quality/ratings
    const exaResponse = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EXA_API_KEY
      },
      body: JSON.stringify({
        query: `recent building permits and renovation history for ${address} and school ratings nearby`,
        useAutoprompt: true,
        numResults: 5,
        contents: { text: true }
      })
    });

    const searchData = await exaResponse.json();
    const contents = searchData.results?.map((r: any) => r.text).join('\n\n') || "No deep data found.";

    // Stage 2: GPT Synthesis and Scoring
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a Senior Real Estate Analyst. 
Analyze the provided web search data for a property address and return a JSON object.

SCORING RULES (1-100):
- High Value (80+): Recent major renovations (permits), top-tier schools (9/10 or 10/10), high-growth area.
- Medium Value (50-79): Minor updates, average schools, stable area.
- Low Value (Below 50): No recent work, poor schools, or negative area signals.

OUTPUT FORMAT:
{
  "score": number,
  "summary": "2-sentence punchy summary of why this score was given.",
  "receipts": ["List of 3 specific facts found"]
}`
        },
        {
          role: "user",
          content: `Address: ${address}\n\nSearch Data:\n${contents}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      score: result.score || 50,
      intelligence: `Score: ${result.score}/100\n\nSummary: ${result.summary}\n\nFindings:\n- ${result.receipts?.join('\n- ')}`
    };

  } catch (error) {
    console.error('[Intelligence Error]', error);
    return null;
  }
}
