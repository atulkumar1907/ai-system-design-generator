// src/services/ai.service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError"; //

// Check if the key exists before initializing
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel(
  { 
    model: "gemini-2.5-flash", // Use the latest stable free-tier model
    generationConfig: { 
      responseMimeType: "application/json"
     } 
  },
  // { apiVersion: "v1" } // Use stable v1 instead of v1beta to avoid 404s
);

export const generateArchitecture = async (payload: { prompt: string; architectureTypes: string[] }) => {
  try {
    const { prompt, architectureTypes } = payload;

    const systemPrompt = `
      You are an expert System Architect. Generate system designs for: "${prompt}".
      
      Return a SINGLE JSON object where each key is one of these architecture types: ${architectureTypes.join(", ")}.
      
      Each type object MUST contain:
      - nodes: Array of { "id": string, "type": string, "label": string, "x": number, "y": number, "color": string }
      - edges: Array of { "id": string, "from": string, "to: string, "label": string }
      - explanation: { "overview": string, "components": string[], "pros": string[], "cons": string[] }
      - metrics: { "scalability": string, "cost": string, "complexity": string }

      CRITICAL: Ensure "nodes" and "edges" are NOT empty. Provide at least 5 nodes for each design.
    `;

    const result = await model.generateContent(systemPrompt);
    const content = result.response.text();
    const parsedData = JSON.parse(content);

    return architectureTypes.map((type) => {
      // Look for the data under the specific type key
      const design = parsedData[type] || {}; 
      
      return {
        type,
        systemName: `${type} Design for ${prompt}`,
        nodes: design.nodes || [], //
        edges: design.edges || [], //
        explanation: design.explanation || { overview: "No data generated" },
        metrics: design.metrics || { status: "missing" },
      };
    });
  } catch (error: any) {
    throw new ApiError(500, "AI_SERVICE_ERROR", error.message); //
  }
};