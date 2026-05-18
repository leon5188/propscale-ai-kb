const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const dotenv = require('dotenv');

// 1. 加载本地环境变量
const envPath = path.resolve('/Users/peifengni/propscale-ai-kb/.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) { process.env[k] = envConfig[k]; }

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runMarketingFactory() {
  console.log("🚀 Starting PropScale AI Marketing Factory...");

  // 1. 生成文案
  console.log("📝 Generating high-converting copy and image prompt...");
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { 
        role: "system", 
        content: "You are a world-class ad agency creative director. Focus on selling SaaS to real estate agents." 
      },
      { 
        role: "user", 
        content: "Generate a social media post for 'PropScale AI'. It's a tool that replies to real estate leads via SMS instantly using AI. Output JSON: { 'caption': '...', 'image_prompt': '...' }" 
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = JSON.parse(completion.choices[0].message.content);
  console.log("\n--- CAPTION ---\n", content.caption);

  // 2. 生成图片 (With Robust Error Handling)
  let imageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"; // Default high-quality real estate placeholder
  
  console.log("\n🎨 Attempting to generate image...");
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: content.image_prompt,
      n: 1,
      size: "1024x1024",
    });
    imageUrl = image.data[0].url;
    console.log("✨ DALL-E IMAGE GENERATED!");
  } catch (err) {
    console.warn("⚠️ Image generation skipped: OpenAI account might not have DALL-E access yet. Using high-quality placeholder.");
  }

  console.log("\n--- FINAL ASSETS ---");
  console.log("Caption:", content.caption);
  console.log("Image URL:", imageUrl);
  console.log("\n🚀 Next Step: Connect this to Make.com/GHL.");
}

runMarketingFactory().catch(console.error);
