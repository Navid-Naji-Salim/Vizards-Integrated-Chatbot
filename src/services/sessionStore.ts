type Message = {

    role:"user" | "assistant";

    content:string;

};

const sessions:
Record<string,Message[]> = {};

function getKey(
    projectId:string,
    sessionId:string
){

    return `${projectId}:${sessionId}`;

}

export function getSession(

    projectId:string,

    sessionId:string

){

    const key =
    getKey(projectId,sessionId);

    if(!sessions[key]){

        sessions[key] = [];

    }

    return sessions[key];

}

export function addMessage(

    projectId:string,

    sessionId:string,

    role:"user" | "assistant",

    content:string

){

    const key =
    getKey(projectId,sessionId);

    if(!sessions[key]){

        sessions[key] = [];

    }

    sessions[key].push({

        role,

        content

    });

    // keep last 10
    if(sessions[key].length > 10){

        sessions[key] =
        sessions[key].slice(-10);

    }

}