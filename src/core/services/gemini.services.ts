import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyXXXXXXXXXXXX';
const ai = new GoogleGenAI({ apiKey: 'AIzaSyXXXXXXXXXXXX' });

export const getDailyNumerology = async (name: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short daily numerology forecast for a person named ${name}. Include their "Number of the Day", a thematic headline (like "MONEY, FRIENDS, AND FAMILY"), and a 2-paragraph optimistic interpretation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dayNumber: { type: Type.INTEGER },
            headline: { type: Type.STRING },
            reading: { type: Type.STRING }
          },
          required: ["dayNumber", "headline", "reading"]
        }
      }
    });
    console.log("Gemini Response:", response);
    // Ensure response.text is always a string before parsing
    return JSON.parse(response.text ?? '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      dayNumber: 8,
      headline: "MONEY, FRIENDS, AND FAMILY - AN 8 DAY",
      reading: "An 8 day almost always highlights financial issues. It will be a busy and demanding day, so try to balance work with pleasure. Tonight is a good night to socialize and meet new people."
    };
  }
};
