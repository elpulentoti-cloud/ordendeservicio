
import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Correct initialization with named parameter and direct process.env.API_KEY usage
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeAgreement = async (rawNotes: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza estas notas de una reunión con un cliente y extrae los acuerdos clave para trazabilidad: "${rawNotes}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionItems: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "keyPoints"]
        }
      }
    });
    // Fixed: Using the .text property directly and trimming it
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error analyzing agreement:", error);
    return { summary: "Error al procesar", keyPoints: [] };
  }
};

export const fetchDailyWisdom = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Genera la información del día para Chile: 1. El Evangelio del día (breve). 2. Tres efemérides importantes de Chile y el mundo. 3. El Santoral del día.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            evangelio: { type: Type.STRING },
            efemerides: { type: Type.ARRAY, items: { type: Type.STRING } },
            santoral: { type: Type.STRING }
          }
        }
      }
    });
    // Fixed: Using the .text property directly and trimming it
    return JSON.parse(response.text.trim());
  } catch (error) {
    return {
      evangelio: "Cargando sabiduría...",
      efemerides: ["Hoy es un gran día para servir."],
      santoral: "Varios"
    };
  }
};
