import { getIndex } from '@/lib/pinecone';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const embeddingResponse = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const embedding = embeddingResponse.data[0].embedding;

    const index = getIndex();
    const queryResponse = await index.query({
      vector: embedding,
      topK: 10,
      includeMetadata: true,
    });

    const results = queryResponse.matches.map((match) => ({
      id: match.id,
      score: match.score,
      text: (match.metadata as any)?.text,
      source: (match.metadata as any)?.source,
    }));

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
