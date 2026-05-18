import os
import requests
import json
from openai import OpenAI
from datetime import datetime

# 1. 配置你的秘钥 (建议存入 .env 文件)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GHL_API_TOKEN = os.getenv("GHL_API_TOKEN")
LOCATION_ID = "dcJGZR1L77vJd0rvaNI5" # propscale ai

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_marketing_content(day_number):
    """使用 GPT-4 生成文案和绘图 Prompt"""
    print(f"🚀 Generating content for Day {day_number}...")
    
    prompt = f"""
    Create a high-converting social media post for Day {day_number} of a 7-day campaign for 'PropScale AI'.
    Product: A SaaS for Real Estate agents that uses AI to reply to SMS leads instantly and has a 12-month automated follow-up.
    
    Output JSON format:
    {{
      "caption": "The social media caption in English",
      "image_prompt": "A detailed DALL-E 3 prompt for a high-quality photorealistic real estate technology image"
    }}
    """
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    
    return json.loads(response.choices[0].message.content)

def generate_image(image_prompt):
    """调用 DALL-E 3 生成图片并返回 URL"""
    print("🎨 Generating image with DALL-E 3...")
    response = client.images.generate(
        model="dall-e-3",
        prompt=image_prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    return response.data[0].url

def send_to_ghl_content_center(caption, image_url):
    """将内容发送到 GHL Social Planner (作为待发布内容)"""
    print("📤 Sending to GHL Social Planner...")
    
    # GHL Social Planner API Endpoint (API v2)
    # 注意：发送到 Social Planner 通常需要通过 OAuth 授权
    # 如果通过 Make.com 转发会更简单，这里展示直接 API 思路
    url = f"https://services.leadconnectorhq.com/social-media/posts"
    
    payload = {
        "locationId": LOCATION_ID,
        "content": caption,
        "media": [image_url],
        "status": "draft" # 存为草稿，方便你最后确认
    }
    
    headers = {
        "Authorization": f"Bearer {GHL_API_TOKEN}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    # 模拟发送 (实际部署时需确保 GHL API 包含 social_media.write 权限)
    # response = requests.post(url, json=payload, headers=headers)
    # return response.json()
    
    print(f"✅ Success! Content staged in GHL for location {LOCATION_ID}")
    print(f"Caption: {caption[:50]}...")
    print(f"Image: {image_url}")

# --- 运行示例 ---
if __name__ == "__main__":
    # 生成第 1 天的内容
    content = generate_marketing_content(1)
    
    # 生成图片
    img_url = generate_image(content['image_prompt'])
    
    # 推送到 GHL
    send_to_ghl_content_center(content['caption'], img_url)
