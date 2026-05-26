import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PROPSCALE AI - BLOG CONTENT FACTORY
 * ----------------------------------
 * Purpose: Automatically generate thousands of city-specific real estate market 
 * intelligence reports for Programmatic SEO.
 * 
 * Instructions for AI Studio:
 * 1. Ensure OPENAI_API_KEY is set in .env.
 * 2. Run: npx ts-node scripts/blog-factory.ts
 * 3. Results saved to: src/content/blog/
 */

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TARGET_CITIES = [
  "Alhambra, CA", "Pasadena, CA", "San Marino, CA", "Arcadia, CA", "Monterey Park, CA",
  "Rosemead, CA", "Temple City, CA", "San Gabriel, CA", "El Monte, CA", "South Pasadena, CA",
  // Add more cities here...
];

async function generateCityReport(city: string) {
  console.log(`✍️ Generating report for: ${city}...`);

  const prompt = `
    You are a Senior Real Estate Market Analyst for PropScale AI.
    Generate a deep-dive SEO blog post for the real estate market in ${city}.

    CONTENT STRUCTURE:
    1. Title: AI Analysis: ${city} Real Estate Market Trends (2026)
    2. Executive Summary: Why this market is hot right now.
    3. The "Speed-to-Lead" Factor: Specific advice for ${city} agents on how AI can capture more listings.
    4. Market Intelligence: Mention Zillow Zestimate trends and why real-time data is critical.
    5. Local Opportunity: A call to action for agents to use PropScale AI to dominate ${city}.

    VOICE STANDARDS:
    - No Fluff. No "revolutionary" or "game-changing".
    - Direct, punchy, and data-driven.
    - Mention PropScale AI as the native CRM integration of choice.

    FORMAT:
    Return as Markdown with frontmatter.
    ---
    title: AI Analysis: ${city} Real Estate Market
    description: How AI is reshaping lead conversion in ${city}.
    date: ${new Date().toISOString().split('T')[0]}
    slug: ${city.toLowerCase().replace(/,?\s+/g, '-')}
    ---
    (Article content follows...)
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message.content;
    if (!content) return null;

    const fileName = `${city.toLowerCase().replace(/,?\s+/g, '-')}.md`;
    const filePath = path.join(process.cwd(), 'src/content/blog', fileName);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Saved: ${fileName}`);
  } catch (error) {
    console.error(`❌ Error generating ${city}:`, error);
  }
}

async function runFactory() {
  console.log("🚀 Starting PropScale AI Content Factory...");
  
  for (const city of TARGET_CITIES) {
    await generateCityReport(city);
    // Anti-rate limit delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log("\n🎉 Factory run complete. Refresh your blog directory.");
}

runFactory();
