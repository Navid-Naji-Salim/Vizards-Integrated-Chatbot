import { Router } from "express";
import { getChunks } from "../services/knowledgeStore.js";
import { openai } from "../services/openai.js";

const router = Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    const chunks = getChunks();
    console.log("Chunks:", chunks);

    const match = chunks.find(chunk =>
        chunk.toLowerCase().includes(message.toLowerCase())
    );

    if (!match) {
        return res.json({
            answer: "No relevant info found"
        });
    }

    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: `Question: ${message}\n\nContext:\n${match}`
    });

    res.json({
        answer: response.output_text
    });
});

export default router;