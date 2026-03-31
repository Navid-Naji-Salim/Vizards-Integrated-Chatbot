export const knowledgeChunks: string[] = [];

export function addChunks(chunks: string[]) {
    knowledgeChunks.push(...chunks);
}

export function getChunks() {
    return knowledgeChunks;
}