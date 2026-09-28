import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;
if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  } catch {}
}

export class VectorService {
  /**
   * Computes cosine similarity between two vector arrays (number[])
   */
  static cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) {
      return 0.5; // neutral fallback
    }
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Generates embedding vector for a given string text
   */
  static async getEmbedding(text: string): Promise<number[]> {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
        const result = await model.embedContent(text);
        if (result.embedding?.values) {
          return result.embedding.values;
        }
      } catch (err) {
        console.warn('Embedding API call failed, generating deterministic fallback vector:', err);
      }
    }
    // Fallback: generate pseudo-embedding representation from word frequencies
    return this.generatePseudoEmbedding(text);
  }

  private static generatePseudoEmbedding(text: string, dimensions = 64): number[] {
    const hashStr = text.toLowerCase();
    const vec: number[] = new Array(dimensions).fill(0);
    for (let i = 0; i < hashStr.length; i++) {
      const code = hashStr.charCodeAt(i);
      vec[i % dimensions] = (vec[i % dimensions] + code * 17) % 100 / 100;
    }
    // Normalize vector
    const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
    return norm > 0 ? vec.map(v => v / norm) : vec;
  }
}
