import { GoogleGenAI } from "@google/genai";
import { Coin } from "../types";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set
const ai = new GoogleGenAI({ apiKey });

export const generateCoinAnalysis = async (coin: Coin): Promise<string> => {
  if (!apiKey) return "AI Analysis unavailable (Missing API Key)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze this meme coin for a "pump.fun" style dashboard. 
        Be witty, slightly sarcastic, and use crypto slang (WAGMI, REKT, SEND IT).
        
        Coin Name: ${coin.name}
        Ticker: ${coin.ticker}
        Description: ${coin.description}
        Market Cap: $${coin.marketCap}
        Bonding Curve Progress: ${coin.bondingCurveProgress}%
        
        Provide a short paragraph (max 50 words) predicting its fate.
      `,
    });
    return response.text || "Analysis failed to generate.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI is currently sleeping. Try again later.";
  }
};
