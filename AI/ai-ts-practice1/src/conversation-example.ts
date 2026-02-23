import { AzureOpenAI } from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import * as dotenv from "dotenv";

dotenv.config();

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
});

interface ConversationMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function chatWithContext() {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "당신은 LIMS 전문가입니다. 검사실 관련 질문에 답변합니다.",
    },
  ];

  // 대화 시뮬레이션
  const conversations = [
    "검체 라벨링 규칙이 뭔가요?",
    "그럼 바코드는 어떻게 붙이나요?",
    "라벨이 손상되면 어떻게 하나요?",
  ];

  for (const userInput of conversations) {
    messages.push({ role: "user", content: userInput });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantReply = response.choices[0]?.message.content || "";
    messages.push({ role: "assistant", content: assistantReply });

    console.log(`Q: ${userInput}`);
    console.log(`A: ${assistantReply}\n`);
    console.log(`누적 토큰: ${response.usage?.total_tokens}\n`);
  }
}

chatWithContext().catch(console.error);
