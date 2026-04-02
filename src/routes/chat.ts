import { Router } from "express";

import { getChunks }
from "../services/knowledgeStore.js";

import {
    getSession,
    addMessage
}
from "../services/sessionStore.js";

import { openai }
from "../services/openai.js";

import type {
ResponseInput
}
from "openai/resources/responses/responses";

const router = Router();

router.post(

"/chat",

async(req,res)=>{

try{

    const {

        message,

        projectId,

        sessionId

    } = req.body;

    if(!message ||
       !projectId ||
       !sessionId){

        return res.status(400).json({

            error:
            "message, projectId, sessionId required"

        });

    }

    const chunks =
    getChunks(projectId);

    const context =
    chunks.slice(0,5).join("\n");

    const conversation =
    getSession(sessionId);

    const input:
    ResponseInput = [

        {

            role:"system",

            content:

`You are an assistant for a skyscraper project.

Answer only using the project info.

If answer not present,
say you don't know.

Project info:

${context}`

        },

        ...conversation.map(

        msg => ({

            role:msg.role,

            content:msg.content

        })

        ),

        {

            role:"user",

            content:message

        }

    ];

    const response =
    await openai.responses.create({

        model:
        "gpt-4.1-mini",

        input,

        max_output_tokens:500

    });

    const answer =
    response.output_text ||
    "No response";

    addMessage(

        sessionId,

        "user",

        message

    );

    addMessage(

        sessionId,

        "assistant",

        answer

    );

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