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

    // Always provide context (fallback to all knowledge if no keyword match)
    const context = match || chunks.join("\n");

    try {

        const response = await openai.responses.create({
            model: "gpt-4.1-mini",
            max_output_tokens: 300,
            input: `You are a helpful assistant for the Aram Towers skyscraper project.

Use the project information below to answer the user's question.

If the question is vague, explain what the skyscraper project is about and what information is available.
If the question is not directly related, still try to connect it to the project information and be helpful.
Never say "I don't know" unless the project information truly contains nothing relevant.

Project information:
${context}

User question:
${message}`
        });

        res.json({
            answer: response.output_text || "No response"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            answer: "AI request failed"
        });

    }

});

export default router;