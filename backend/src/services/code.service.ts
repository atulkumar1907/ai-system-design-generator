import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError"; //

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

export const generateCode = async (data: { 
  diagramId: string; 
  language: string; 
  framework: string;
  architectureData: any; 
}) => {
  try {
    const { language, framework, architectureData } = data;

    const codePrompt = `
      You are a senior software developer at a product based company. Generate a production-ready boilerplate for a ${framework} project in ${language}.
      Components to implement: ${JSON.stringify(architectureData.nodes.map((n: any) => n.label))}.
      
      Return a JSON object with a "fileTree" key containing an array of:
      { "path": string, "content": string, "language": string }
      
      CRITICAL: Include at least 4 files: a main entry point, a configuration file, a service file, and a README.md.
    `;

    const result = await model.generateContent(codePrompt);
    const content = result.response.text();
    const parsedData = JSON.parse(content);

    return {
      diagramId: data.diagramId,
      language,
      framework,
      fileTree: parsedData.fileTree || [], //
      generatedAt: new Date().toISOString(),
    };
  } catch (error: any) {
    throw new ApiError(500, "CODE_SERVICE_ERROR", error.message); //
  }
};