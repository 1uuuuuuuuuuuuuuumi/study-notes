import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
});

async function streamResponse(userQuestion: string) {
  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "간결하게 답변하세요." },
      { role: "user", content: userQuestion },
    ],
    stream: true,
  });

  process.stdout.write("AI 응답: ");
  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content);
    fullResponse += content;
  }

  console.log("\n");
  return fullResponse;
}

// 테스트
streamResponse("Node.js에서 비동기 처리란 무엇인가요?").catch(console.error);
