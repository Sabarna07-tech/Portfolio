// app/api/chat/route.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { query } = await req.json();

  // 1. Embed the user's prompt using Pinecone's inference model
  const queryEmbedding = await pc.inference.embed({
    model: 'llama-text-embed-v2',
    inputs: [query],
    parameters: { input_type: 'query' }
  });

  // 2. Query the Pinecone index for the closest code chunks
  const index = pc.index('portfolio-rag');
  const searchRes = await index.query({
    vector: queryEmbedding.data[0].values as number[],
    topK: 4,
    includeMetadata: true,
  });

  const context = searchRes.matches
    .map((match) => match.metadata?.text || '')
    .join('\n\n---\n\n');

  // 3. Orchestrate Gemini with the retrieved context
  const systemPrompt = `You are an AI assistant representing Sabarna Saha's professional engineering portfolio.
Answer the user's question based ONLY on the following codebase context. 
Write in my tone: highly technical, concise, energetic, and results-driven.

Context:
${context}`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    prompt: query,
  });
  return result.toTextStreamResponse();
}
