
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateContentRefinement = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أعد صياغة النص التالي ليكون أكثر احترافية وجاذبية بأسلوب رسمي سعودي (رؤية 2030): "${text}"`,
    config: {
      systemInstruction: "أنت خبير محتوى إبداعي سعودي. اجعل النصوص مقتضبة، قوية، ومناسبة للهوية البصرية الرسمية. استخدم كلمات مثل 'تمكين'، 'ريادة'، 'ازدهار'.",
    }
  });
  return response.text;
};

export const generateFullCarousel = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أنشئ محتوى كاروسيل كامل مكون من 5 شرائح حول موضوع: "${topic}". 
    يجب أن يتضمن الرد كود JSON فقط بالهيكل التالي:
    {
      "slides": [
        {"type": "intro", "title": "...", "subtitle": "...", "description": "..."},
        {"type": "stats", "title": "أرقام هامة", "stats": [{"label": "...", "value": "..."}]},
        {"type": "points", "title": "لماذا نختار هذا؟", "points": [{"text": "..."}]},
        {"type": "closing", "title": "انضم إلينا", "description": "..."}
      ]
    }`,
    config: {
      responseMimeType: "application/json",
      systemInstruction: "أنت مصمم محتوى سعودي محترف. قدم بيانات دقيقة وجذابة باللغة العربية الفصحى المعاصرة."
    }
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("JSON Parsing Error", e);
    return null;
  }
};

export const generateDesignImage = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `High-end professional cinematic photography for Saudi Arabia Vision 2030 theme. Concept: ${prompt}. Minimalist, architectural, clean, luxury green and sand gold tones.` }
      ]
    },
    config: { imageConfig: { aspectRatio: "4:5" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};
