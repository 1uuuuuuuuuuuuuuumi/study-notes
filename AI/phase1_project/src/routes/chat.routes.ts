import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { llmService } from "../services/llm.service";
import { sessionService } from "../services/session.service";
import { ChatRequest, ChatResponse } from "../models/types";

export const chatRouter = Router();

/**
 * POST /api/chat
 * 채팅 메시지 전송
 */
chatRouter.post(
  "/",
  async (
    req: Request<{}, {}, ChatRequest>,
    res: Response<ChatResponse | { error: string }>,
  ) => {
    try {
      const { sessionId, message, systemPrompt } = req.body;

      // 메시지 검증
      if (!message || message.trim().length === 0) {
        return res.status(400).json({ error: "Message is required" });
      }

      // 세션 ID 생성 또는 가져오기
      const currentSessionId = sessionId || uuidv4();

      // 세션이 없으면 생성
      if (!sessionService.hasSession(currentSessionId)) {
        sessionService.createSession(currentSessionId);
      }

      // 대화 기록 가져오기
      const conversation = sessionService.getConversation(currentSessionId);

      console.log(`📨 [${currentSessionId}] User: ${message}`);

      // LLM 호출
      const { response, tokensUsed, cost } = await llmService.chat(
        message,
        conversation,
        systemPrompt,
      );

      // 대화 저장
      sessionService.addMessage(currentSessionId, "user", message);
      sessionService.addMessage(currentSessionId, "assistant", response);

      console.log(
        `💬 [${currentSessionId}] Assistant: ${response.substring(0, 50)}...`,
      );

      // 응답
      res.json({
        sessionId: currentSessionId,
        response,
        tokensUsed,
        totalCost: cost,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("❌ Chat error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

/**
 * GET /api/chat/session/:sessionId
 * 세션 대화 기록 조회
 */
chatRouter.get("/session/:sessionId", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    if (!sessionService.hasSession(sessionId)) {
      return res.status(404).json({ error: "Session not found" });
    }

    const conversation = sessionService.getConversation(sessionId);
    const sessionInfo = sessionService.getSessionInfo(sessionId);

    res.json({
      sessionInfo,
      conversation,
    });
  } catch (error: any) {
    console.error("❌ Get session error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE /api/chat/session/:sessionId
 * 세션 삭제
 */
chatRouter.delete("/session/:sessionId", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const deleted = sessionService.deleteSession(sessionId);

    if (!deleted) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error: any) {
    console.error("❌ Delete session error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/chat/sessions
 * 모든 세션 목록 조회
 */
chatRouter.get("/sessions", (req: Request, res: Response) => {
  try {
    const stats = sessionService.getStats();
    res.json(stats);
  } catch (error: any) {
    console.error("❌ Get sessions error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE /api/chat/sessions
 * 모든 세션 삭제
 */
chatRouter.delete("/sessions", (req: Request, res: Response) => {
  try {
    sessionService.clearAllSessions();
    res.json({ message: "All sessions deleted successfully" });
  } catch (error: any) {
    console.error("❌ Clear sessions error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
