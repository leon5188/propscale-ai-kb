import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = () => {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    // During build time, we don't want to crash. 
    // We only throw if this is actually called at runtime.
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
        throw new Error('PINECONE_API_KEY is not set');
    }
    return null;
  }
  return new Pinecone({ apiKey });
};

export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX_NAME;
  const pinecone = getPineconeClient();
  
  if (!pinecone || !indexName) {
    return null;
  }
  
  return pinecone.index(indexName);
};
