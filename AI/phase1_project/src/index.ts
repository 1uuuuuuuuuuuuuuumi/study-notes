import express from "express";
import cors from "cors";
import path from "path";
import { chatRouter } from "./routes/chat.routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // 정적 파일 제공

// 라우트
app.use("/api/chat", chatRouter);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "LLM Chat API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// 에러 핸들러
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("❌ Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  },
);

// 서버 시작
app.listen(port, () => {
  console.log("Server is running!");
});
