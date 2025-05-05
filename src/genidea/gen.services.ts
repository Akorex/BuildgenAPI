import { GoogleGenAI } from "@google/genai";
import { genDTO } from "./gen.interface";

export const ai = new GoogleGenAI({
  apiKey: "AIzaSyBJZY2S3e35U3FJy16g3KbcZNaJUrnZ7ak",
});

export class GenService {
  public async generateBuildIdea(payload: genDTO) {
    try {
      console.log(payload);

      const response = await ai.models.generateContent({
        model: "gemini-2.0-pro",
        contents: `
        You are a product architect that helps builders quickly design MVPs.
        
        Given the following information:
        - *Category*: ${payload.category}
        - *Creator Profile*: ${payload.creatorProfile} (e.g., solo, team, technical, non-technical)
        - *Time Span*: ${payload.timeSpan} (e.g., 1 week, 2 weeks, etc.)

            Please generate:
            1. A recommended tech stack with the following fields:
               - Frontend (e.g., React, Next.js)
               - Backend (e.g., Node.js, Firebase)
               - Auth (e.g., Supabase, Clerk, Firebase Auth)
               - AI (e.g., OpenAI, Langchain, none)
               - Deployment (e.g., Vercel, Render)

            2. A list of 5- 10 development tasks. Each task should include:
            - Task name
            - Tool/technology used
            - Estimated time to complete (in hours or days)

            Make sure the stack and tasks are tailored to the builder type (e.g., choose no-code tools for non-technical builders), and the tasks are scoped to be achievable within the provided time span.
            Respond in JSON format using the following structure:

            {
              "productName": "...",
              "stack": {
                "frontend": "...",
                "backend": "...",
                "auth": "...",
                "ai": "...",
                "deployment": "..."
              },
              "tasks": [
                {
                  "taskName": "...",
                  "tool": "...",
                  "estimatedTime": "..."
                },
                ...
              ]
            }
        `,
      });
      console.log(response.text);

      return response.text;
    } catch (error) {
      throw error;
    }
  }
}
