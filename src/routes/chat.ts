import { Router } from "express";

const router = Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    // Mock RAG response
    const answer = `Mock answer for: ${message}`;

    res.json({
        answer
    });
});

export default router;
