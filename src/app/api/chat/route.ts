import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
// import { getIndex } from '@/lib/pinecone'; // Commenting out if not fully set up, or keeping if it works
// import OpenAI from 'openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('Missing OPENAI_API_KEY', { status: 500 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `你是一个 PropScale AI 的高级房产助理。
    你的主要任务是：
    1. 解答用户关于 PropScale AI 平台的问题。
    2. 在对话中自然地引导用户提供联系方式（尤其是手机号），以便后续安排看房或提供详细资料。
    3. 说话语气要专业、热情、且具有销售意识。
    4. 只要用户提到了姓名、电话或邮箱，请立即调用 saveLeadInfo 工具记录下来。
    
    业务背景：PropScale AI 是一个专为房地产经纪人设计的 AI CRM，能自动化跟进线索，提高转化率。`,
    messages,
    maxSteps: 5,
    tools: {
      saveLeadInfo: tool({
        description: '记录潜在客户的联系信息（姓名、电话、邮箱）。只要用户提供其中任何一项即可调用。',
        parameters: z.object({
          name: z.string().optional().describe('客户姓名'),
          phone: z.string().describe('客户手机号'),
          email: z.string().optional().describe('客户邮箱'),
        }),
        execute: async ({ name, phone, email }) => {
          try {
            const lead = await prisma.lead.upsert({
              where: { phone },
              update: { name, email },
              create: { name, phone, email },
            });
            console.log('Lead saved:', lead);
            return `已成功记录联系信息：${phone}。请告知用户我们将很快联系他们。`;
          } catch (error) {
            console.error('Error saving lead:', error);
            return '记录信息时出错，请稍后再试。';
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
