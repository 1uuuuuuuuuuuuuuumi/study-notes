import { encoding_for_model, Tiktoken } from "tiktoken";

interface CostEstimate {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

class TokenCounter {
  private encoding: Tiktoken;

  private prices = {
    "gpt-4o": { input: 0.005, output: 0.015 },
    "gpt-4o-mini": { input: 0.00015, output: 0.0006 },
  };

  constructor(model: string = "gpt-4o-mini") {
    this.encoding = encoding_for_model(model as any);
  }

  countTokens(text: string): number {
    return this.encoding.encode(text).length;
  }

  estimateCost(
    prompt: string,
    completion: string,
    model: "gpt-4o" | "gpt-4o-mini" = "gpt-4o-mini",
  ): CostEstimate {
    const inputTokens = this.countTokens(prompt);
    const outputTokens = this.countTokens(completion);

    const inputCost = (inputTokens / 1000) * this.prices[model].input;
    const outputCost = (outputTokens / 1000) * this.prices[model].output;

    return {
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost,
    };
  }

  free() {
    this.encoding.free();
  }
}

// 사용 예제
const counter = new TokenCounter("gpt-4o-mini");

const prompt = "LIMS 시스템에서 검체 추적이 중요한 이유를 설명해주세요.";
const completion =
  "검체 추적은 환자 안전과 검사 품질 보증을 위해 필수적입니다...";

const cost = counter.estimateCost(prompt, completion);

console.log(`입력 토큰: ${cost.inputTokens}`);
console.log(`출력 토큰: ${cost.outputTokens}`);
console.log(`총 비용: $${cost.totalCost.toFixed(6)}`);

counter.free();
