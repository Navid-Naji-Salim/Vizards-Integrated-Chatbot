import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";
import knowledgeRoutes from "./routes/knowledge.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);
app.use("/api", knowledgeRoutes);

app.get("/", (_req, res) => {
  res.send("Chatbot backend running");
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
