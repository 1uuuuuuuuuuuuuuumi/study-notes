import { AzureOpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import * as dotenv from "dotenv";

dotenv.config();

interface LLMResponse {
  response: string;
  tokensUsed: number;
  cost: number;
}

class LLMService {
  private client: AzureOpenAI;

  // gpt-4o-mini 가격 (per 1K tokens)
  private readonly COST_PER_1K_TOKENS = 0.0006;

  constructor() {
    this.client = new AzureOpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview",
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    });
  }

  /**
   * LLM 호출
   */
  async chat(
    message: string,
    conversationHistory: ChatCompletionMessageParam[] = [],
    systemPrompt: string = "당신은 친절한 AI 어시스턴트입니다.",
  ): Promise<LLMResponse> {
    try {
      // 메세지 구성
      const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: message },
      ];

      console.log(`🤖 LLM 호출 (메세지 수: ${messages.length})`);

      // API 호출
      const response = await this.client.chat.completions.create({
        model: process.env.AZURE_OPENAI_MODEL || "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 800,
      });

      const tokensUsed = response.usage?.total_tokens || 0;
      const cost = (tokensUsed / 1000) * this.COST_PER_1K_TOKENS;

      console.log(
        `✅ 응답 받음 (토큰: ${tokensUsed}, 비용: $${cost.toFixed(6)})`,
      );

      return {
        response: response.choices[0].message.content || "",
        tokensUsed,
        cost,
      };
    } catch (error: any) {
      console.error("❌ LLM 호출 오류:", error.message);
      throw new Error(`LLM API 호출 실패: ${error.message}`);
    }
  }

  /**
   * 스트리밍 채팅 (향후 확장용)
   */
  async streamChat(
    message: string,
    conversationHistory: ChatCompletionMessageParam[] = [],
    systemPrompt: string = "당신은 친절한 AI 어시스턴트입니다.",
  ) {
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    const stream = await this.client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_GPT4 || "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 800,
      stream: true,
    });

    return stream;
  }
}

export const llmService = new LLMService();
