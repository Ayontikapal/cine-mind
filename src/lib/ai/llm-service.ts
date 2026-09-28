import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const LLM_MODEL = process.env.LLM_MODEL || 'gemini-2.0-flash';

let genAI: GoogleGenerativeAI | null = null;
if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  } catch (err) {
    console.warn('Failed to initialize Gemini AI client:', err);
  }
}

export class LLMService {
  static async generateJson<T>(prompt: string, fallback: T): Promise<T> {
    if (!genAI) {
      return fallback;
    }

    try {
      const model = genAI.getGenerativeModel({ model: LLM_MODEL });
      const systemInstruction = "You are CineMind's movie recommendation AI. Output ONLY valid JSON matching the requested structure. No markdown backticks, no markdown formatting.";
      const result = await model.generateContent(`${systemInstruction}\n\n${prompt}`);
      const text = result.response.text().trim();
      
      // Clean JSON formatting if model added backticks
      const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
      return JSON.parse(cleanJson) as T;
    } catch (err) {
      console.warn('Gemini LLM JSON generation failed or model key missing, using smart fallback:', err);
      return fallback;
    }
  }

  static async generateText(prompt: string, fallback: string): Promise<string> {
    if (!genAI) {
      return fallback;
    }

    try {
      const model = genAI.getGenerativeModel({ model: LLM_MODEL });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err) {
      console.warn('Gemini LLM text generation failed, using fallback:', err);
      return fallback;
    }
  }
}
