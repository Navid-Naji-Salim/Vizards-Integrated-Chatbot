import { Router } from "express";
import { getChunks } from "../services/knowledgeStore.js";

const router = Router();

router.post("/chat", async (req, res) => {

    const { message } = req.body;

    const chunks = getChunks();

    const match = chunks.find(chunk =>
        chunk.toLowerCase().includes(message.toLowerCase())
    );

    const answer = match || "No relevant info found";

    res.json({
        answer
    });

});

export default router;
