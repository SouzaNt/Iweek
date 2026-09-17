/**
 * Google Gemini AI API Client for NorTech AI Career Mentor
 */

const GEMINI_SYSTEM_INSTRUCTION = `Você é o NorTech, um orientador vocacional de tecnologia super inteligente e amigável.
Seu objetivo é conversar com jovens estudantes e descobrir qual área da TI (entre as 33 carreiras de TI disponíveis) mais combina com eles.

Regras da conversa:
1. Faça APENAS UMA pergunta por vez. Nunca envie blocos gigantes de texto.
2. Seja reativo: leia o que o usuário respondeu, faça um breve comentário validando a resposta e, em seguida, faça a próxima pergunta cavando mais fundo nos interesses dele (hobbies, matérias favoritas, como resolve problemas).
3. Adapte seu tom para alguém que está no ensino médio ou curso técnico.
4. Quando você tiver feito cerca de 3 a 5 trocas de mensagens e estiver confiante do perfil do usuário, ENCERRE a conversa retornando EXCLUSIVAMENTE um objeto JSON no formato:
{
  "top_matches": ["id-da-profissao-1", "id-da-profissao-2", "id-da-profissao-3"]
}
Não inclua nenhuma outra palavra ou formatação no seu retorno final.`;

export async function queryGoogleGemini({ messages = [], userText = '', apiKey = null }) {
  const geminiApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (!geminiApiKey) {
    return {
      success: false,
      useFallback: true,
      error: 'VITE_GEMINI_API_KEY não configurada. Usando motor neural integrado.'
    };
  }

  try {
    const contents = [];

    // Add conversation history
    messages.forEach(msg => {
      contents.push({
        role: msg.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      });
    });

    // Add the new user message
    if (userText) {
      contents.push({
        role: 'user',
        parts: [{ text: userText }]
      });
    }

    const payload = {
      system_instruction: {
        parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('Gemini API request failed:', errorData);
      return { success: false, useFallback: true, error: errorData.error?.message };
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      success: true,
      text: candidateText
    };
  } catch (err) {
    console.error('Error invoking Google Gemini API:', err);
    return {
      success: false,
      useFallback: true,
      error: err.message
    };
  }
}
