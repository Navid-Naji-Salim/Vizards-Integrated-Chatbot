import fs from "fs";
import path from "path";

import { chunkText } from "./chunkService.js";
import { addChunks } from "./knowledgeStore.js";

export function loadKnowledge(){

    const knowledgePath =
    path.join(process.cwd(),"knowledge");

    if(!fs.existsSync(knowledgePath)){

        console.log(
        "Knowledge folder not found"
        );

        return;

    }

    const files =
    fs.readdirSync(knowledgePath);

    for(const file of files){

        if(!file.endsWith(".txt"))
        continue;

        const projectId =
        file.replace(".txt","");

        const fullPath =
        path.join(
            knowledgePath,
            file
        );

        const text =
        fs.readFileSync(
            fullPath,
            "utf-8"
        );

        const chunks =
        chunkText(text);

        addChunks(
            projectId,
            chunks
        );

        console.log(
        `Loaded knowledge for: ${projectId}`
        );

    }

}