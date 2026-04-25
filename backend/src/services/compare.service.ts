import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError"; //

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

export const compareArchitectures = async (data: { prompt: string; architectures: any[] }) => {
  try {
    const comparisonPrompt = `
      You are a Senior System Architect. Compare these architectures for the requirement: "${data.prompt}".
      Architectures Data: ${JSON.stringify(data.architectures)}
      
      Return a JSON object with:
      1. "recommendation": A detailed string explaining which architecture is best and why.
      2. "comparison": An object where keys are categories (e.g., "Scalability", "Cost", "Complexity") and values are comparative analysis strings.
      
      CRITICAL: The "comparison" object must not be empty.
    `;

    const result = await model.generateContent(comparisonPrompt);
    const content = result.response.text();
    const parsedData = JSON.parse(content);

    return {
      sessionId: "comp-" + Date.now(),
      prompt: data.prompt,
      generatedAt: new Date().toISOString(),
      architectures: data.architectures,
      comparison: parsedData.comparison || { info: "Comparison data unavailable" },
      recommendation: parsedData.recommendation || "No recommendation provided",
    };
  } catch (error: any) {
    throw new ApiError(500, "COMPARE_SERVICE_ERROR", error.message); //
  }
};