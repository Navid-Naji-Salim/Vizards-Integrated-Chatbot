import { Router } from "express";
import { getChunks } from "../services/knowledgeStore.js";
import { openai } from "../services/openai.js";

import type {
ResponseInput
} from "openai/resources/responses/responses";

const router = Router();

router.post("/chat", async (req, res) => {

try{

    const {
        message,
        projectId,
        history
    } = req.body;

    if(!message || !projectId){

        return res.status(400).json({
            error:"message and projectId required"
        });

    }

    // Safety validation
    const safeHistory =
    Array.isArray(history)
    ? history
    : [];

    // Load project knowledge
    const chunks =
    getChunks(projectId);

    const context =
    chunks.join("\n");

    const input: ResponseInput = [

        {
            role:"system",

            content:
`You are an assistant for a skyscraper project.

Use conversation history when relevant.

Answer using project information when possible.

Project information:

${context}`
        },

        ...safeHistory,

        {
            role:"user",
            content:message
        }

    ];

    const response =
    await openai.responses.create({

        model:"gpt-4.1-mini",

        input,

        max_output_tokens:500

    });

    const answer =
    response.output_text ||
    "No response";

    res.json({
        answer
    });

}
catch(error){

    console.log(error);

    res.status(500).json({
        error:"Chat failed"
    });

}

});

export default router;