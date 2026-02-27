import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export interface Session {
  id: string;
  messages: ChatCompletionMessageParam[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequest {
  sessionId?: string;
  message: string;
  systemPrompt?: string;
}

export interface ChatResponse {
  sessionId: string;
  response: string;
  tokensUsed: number;
  totalCost: number;
  timestamp: string;
}

export interface SessionInfo {
  sessionId: string;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
}
