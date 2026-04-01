import { Router } from "express";
import { getChunks } from "../services/knowledgeStore.js";
import { openai } from "../services/openai.js";

const router = Router();

router.post("/chat", async (req, res) => {

    const { message } = req.body;

    const chunks = getChunks();

    const match = chunks.find(chunk =>
        chunk.toLowerCase().includes(message.toLowerCase())
    );

    // Always provide context
    const context = match || chunks.join("\n");

    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        max_output_tokens: 300,
        input: `Answer using ONLY the provided project information.

Project information:
${context}

Question:
${message}

If the answer is not contained in the project information, say you don't know.`
    });

    res.json({
        answer: response.output_text || "No response"
    });

});

export default router;