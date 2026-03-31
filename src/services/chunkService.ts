export function chunkText(text: string, size = 500) {

    const chunks: string[] = [];

    for(let i = 0; i < text.length; i += size){

        chunks.push(text.substring(i, i + size));

    }

    return chunks;
}