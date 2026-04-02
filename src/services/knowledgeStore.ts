const store: Record<string,string[]> = {};

export function addChunks(
    projectId:string,
    chunks:string[]
){

    if(!store[projectId]){

        store[projectId] = [];

    }

    store[projectId].push(...chunks);

}

export function getChunks(
    projectId:string
){

    return store[projectId] || [];

}