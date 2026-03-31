export const knowledgeChunks: string[] = [];

export function addChunks(chunks: string[]) {
    console.log("ADDING:", chunks);
    knowledgeChunks.push(...chunks);
    console.log("STORE:", chunks);
}

export function getChunks() {
    return knowledgeChunks;
}