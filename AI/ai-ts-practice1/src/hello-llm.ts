import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
});

async function helloLLM() {
  const response = await client.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT_GPT4 || "gpt-4o-mini",
    messages: [
      { role: "system", content: "당신은 친절한 AI 어시스턴트입니다." },
      { role: "user", content: "안녕하세요! LLM이 무엇인가요?" },
    ],
  });

  console.log(response.choices[0]?.message.content);
  console.log(`\n토큰 사용량: ${response.usage?.total_tokens}`);
}

helloLLM().catch(console.error);
