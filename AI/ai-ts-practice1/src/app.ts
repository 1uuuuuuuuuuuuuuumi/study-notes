import express, { type Request, type Response } from "express";
import cors from "cors";
import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
});

interface ChatRequest {
  message: string;
  systemPrompt?: string;
}

app.post("/chat", async (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { message, systemPrompt = "친절한 AI 어시스턴트입니다." } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "systemPrompt" },
        { role: "user", content: message },
      ],
    });

    res.json({
      response: response.choices[0]?.message.content || "",
      tokensUsed: response.usage?.total_tokens || 0,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "LLM Chat API is running" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
