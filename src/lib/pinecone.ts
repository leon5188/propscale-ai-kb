import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY is not set');
  }
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX_NAME;
  if (!indexName) {
    throw new Error('PINECONE_INDEX_NAME is not set');
  }
  const pinecone = getPineconeClient();
  return pinecone.index(indexName);
};
