type Message = {

    role:"user" | "assistant";

    content:string;

};

const sessions:
Record<string,Message[]> = {};

export function getSession(
    sessionId:string
){

    if(!sessions[sessionId]){

        sessions[sessionId] = [];

    }

    return sessions[sessionId];

}

export function addMessage(

    sessionId:string,

    role:"user" | "assistant",

    content:string

){

    if(!sessions[sessionId]){

        sessions[sessionId] = [];

    }

    sessions[sessionId].push({

        role,

        content

    });

    // keep last 10 messages
    if(sessions[sessionId].length > 10){

        sessions[sessionId] =
        sessions[sessionId].slice(-10);

    }

}