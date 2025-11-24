import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

async function Chat(content: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content
    })
    return response.text || "Sorry, something went wrong!!"
}

async function* ChatStreaming(content: string): AsyncGenerator<string> {
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: content
    })

    for await (const chunk of response) {
        yield chunk.text || ""
    }   
}

export {  Chat, ChatStreaming }
