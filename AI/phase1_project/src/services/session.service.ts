// <reference lib="dom" />
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Session, SessionInfo } from "../models/types";

class SessionService {
  private sessions: Map<string, Session> = new Map();

  /**
   * 새 세션 생성
   */
  createSession(sessionId: string): Session {
    const session: Session = {
      id: sessionId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sessions.set(sessionId, session);
    console.log(`✅ Session created: ${sessionId}`);
    return session;
  }

  /**
   * 세션 조회
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * 세션 존재 여부 확인
   */
  hasSession(sessionId: string): boolean {
    return this.sessions.has(sessionId);
  }

  /**
   * 메시지 추가
   */
  addMessage(
    sessionId: string,
    role: "user" | "assistant" | "system",
    content: string,
  ): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.push({ role, content });
      session.updatedAt = new Date();
    }
  }

  /**
   * 대화 기록 가져오기
   */
  getConversation(sessionId: string): ChatCompletionMessageParam[] {
    const session = this.sessions.get(sessionId);
    return session?.messages || [];
  }

  /**
   * 세션 정보 가져오기
   */
  getSessionInfo(sessionId: string): SessionInfo | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    return {
      sessionId: session.id,
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }

  /**
   * 모든 세션 ID 가져오기
   */
  getAllSessionIds(): string[] {
    return Array.from(this.sessions.keys());
  }

  /**
   * 세션 삭제
   */
  deleteSession(sessionId: string): boolean {
    const result = this.sessions.delete(sessionId);
    if (result) {
      console.log(`🗑️ Session deleted: ${sessionId}`);
    }
    return result;
  }

  /**
   * 모든 세션 삭제
   */
  clearAllSessions(): void {
    this.sessions.clear();
    console.log(`🗑️ All sessions cleared`);
  }

  /**
   * 세션 통계
   */
  getStats() {
    return {
      totalSessions: this.sessions.size,
      sessions: Array.from(this.sessions.values()).map((s) => ({
        id: s.id,
        messageCount: s.messages.length,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      })),
    };
  }
}

export const sessionService = new SessionService();
