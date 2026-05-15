import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const indexName = process.env.PINECONE_INDEX_NAME!;

async function scrapeWebsite(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  // Remove script tags, style tags, etc.
  $('script, style, nav, footer').remove();
  
  return $('body').text().replace(/\s+/g, ' ').trim();
}

function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200) {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
}

async function ingest() {
  console.log('Starting ingestion...');
  
  const urls = ['https://propscale-ai.com']; // Add more URLs as needed
  const index = pinecone.index(indexName);

  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    const content = await scrapeWebsite(url);
    const chunks = chunkText(content);
    
    console.log(`Processing ${chunks.length} chunks...`);
    
    for (const chunk of chunks) {
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });
      
      const embedding = embeddingResponse.data[0].embedding;
      
      await index.upsert({
        records: [
          {
            id: uuidv4(),
            values: embedding,
            metadata: {
              text: chunk,
              source: url,
            },
          },
        ]
      });
    }
  }
  
  console.log('Ingestion complete!');
}

ingest().catch(console.error);
