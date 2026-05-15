import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getIndex } from '@/lib/pinecone';
import OpenAI from 'openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  // Move client initialization inside the handler to prevent build-time crashes
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('Missing OPENAI_API_KEY', { status: 500 });
  }

  const openaiClient = new OpenAI({ apiKey });
  const index = getIndex();
  
  if (!index) {
    return new Response('Vector database not initialized', { status: 500 });
  }

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // 1. Generate embedding for the query
  const embeddingResponse = await openaiClient.embeddings.create({
    model: 'text-embedding-3-small',
    input: lastMessage.content,
  });
  const embedding = embeddingResponse.data[0].embedding;

  // 2. Query Pinecone
  const queryResponse = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });

  // 3. Extract context
  const context = queryResponse.matches
    .map((match) => (match.metadata as any)?.text)
    .filter(Boolean)
    .join('\n\n');

  // 4. Generate grounded response
  const result = await streamText({
    model: openai('gpt-4o') as any,
    system: `You are an AI assistant for PropScale AI. Use the following context to answer the user's question. 
    If the answer is not in the context, say you don't know, but try to be helpful based on PropScale AI's general mission as a real estate AI CRM.
    
    Context:
    ${context}`,
    messages,
  });

  return (result as any).toDataStreamResponse();
}
