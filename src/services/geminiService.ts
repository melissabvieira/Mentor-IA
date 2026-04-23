import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface UserProfile {
  interestArea: string;
  currentLevel: string;
  professionalGoal: string;
  studyTime: string;
}

export async function generateCareerAdvice(profile: UserProfile) {
  const prompt = `
    Você é um mentor de carreira experiente em tecnologia.
    Analise o perfil do usuário abaixo e sugira caminhos claros para sua evolução profissional.

    Informações do Usuário:
    - Área de interesse: ${profile.interestArea}
    - Nível atual: ${profile.currentLevel}
    - Objetivo profissional: ${profile.professionalGoal}
    - Tempo disponível para estudos por semana: ${profile.studyTime}

    Responda de forma estruturada (em Markdown) contendo:
    1. **Análise do perfil atual do usuário**: Uma visão geral do momento dele.
    2. **Principais pontos fortes**: O que ele já tem ou pode aproveitar.
    3. **Pontos a melhorar**: O que é crítico para atingir o objetivo.
    4. **Sugestão de carreira ou área mais indicada**: Com base nas tendências e perfil.
    5. **Roadmap de estudos (passo a passo)**: Dividido em etapas lógicas.
    6. **Tecnologias que deve aprender**: Lista prioritária.
    7. **Dicas práticas para entrar no mercado**: (Portfólio, networking, construção de marca pessoal, etc.)

    Use um tom claro, direto, encorajador e didático. Use emojis para tornar a leitura agradável.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating career advice:", error);
    throw new Error("Não foi possível gerar a mentoria no momento.");
  }
}
