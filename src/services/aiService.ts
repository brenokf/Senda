import { GoogleGenAI } from "@google/genai";
import { Card, Spread } from "../types";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function interpretReading(cards: Card[], theme: string, spread: Spread, intent: string) {
  const ai = getAI();
  if (!ai) return null;

  const cardsContext = cards.map((c, i) => {
    const pos = spread.posicoes[i] || { nome_da_posicao: `Posição ${i+1}`, significado: '' };
    return `- ${pos.nome_da_posicao} (${pos.significado}): ${c.name}`;
  }).join('\n');

  const prompt = `
    Você é um mestre oraculista especializado em Tarot e Lenormand.
    Realize uma interpretação profunda e intuitiva para a seguinte tiragem:
    
    Oráculo: ${cards[0].id.startsWith('t') ? 'Tarot' : 'Lenormand'}
    Tiragem: ${spread.nome}
    Tema: ${theme}
    Intenção do Consulente: "${intent || 'Busca por clareza e orientação'}"
    
    Cartas e Posições:
    ${cardsContext}
    
    Diretrizes para a interpretação:
    1. Seja empático, mas honesto.
    2. Conecte o significado das cartas entre si, criando uma narrativa coesa.
    3. Inclua uma seção específica sobre "Desafios e Aspectos Sombrios" (Shadow Work), explorando bloqueios ou alertas importantes.
    4. Ofereça conselhos práticos baseados na sabedoria das cartas.
    5. Mantenha um tom místico, porém acessível.
    6. Use Markdown para formatar a resposta (títulos, negrito, listas).
    
    Responda em Português.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text || "Não foi possível gerar a interpretação no momento.";
  } catch (error) {
    console.error("Error interpreting reading:", error);
    return null;
  }
}

export async function suggestSpreadAI(intent: string, theme: string, oracle: string, availableSpreads: Spread[]): Promise<string | null> {
  const ai = getAI();
  if (!ai) return null;

  const spreadsContext = availableSpreads.map(s => `- ID: ${s.id}, Nome: ${s.nome}, Cartas: ${s.numero_cartas}, Descrição: ${s.descricao}`).join('\n');

  const prompt = `
    Você é um assistente de oráculo especializado em Tarot e Lenormand.
    O usuário tem a seguinte intenção e tema para uma leitura:
    
    Oráculo: ${oracle}
    Tema: ${theme}
    Intenção: "${intent || 'Busca por clareza e orientação'}"
    
    Aqui estão as tiragens disponíveis para este oráculo:
    ${spreadsContext}
    
    Analise a intenção do usuário e escolha o ID da tiragem MAIS ADEQUADA.
    Se a pergunta for simples, escolha uma tiragem com poucas cartas.
    Se a pergunta for complexa ou sobre o futuro a longo prazo, escolha uma tiragem mais robusta.
    Se o tema for Amor, prefira tiragens específicas de amor se disponíveis.
    
    Responda APENAS o ID da tiragem escolhida, sem explicações.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text?.trim() || null;
  } catch (error) {
    console.error("Error suggesting spread:", error);
    return null;
  }
}

const getEnglishCardName = (cardName: string): string => {
  const mapping: Record<string, string> = {
    // Tarot
    'O Louco': 'The Fool',
    'O Mago': 'The Magician',
    'A Sacerdotisa': 'The High Priestess',
    'A Imperatriz': 'The Empress',
    'O Imperador': 'The Emperor',
    'O Hierofante': 'The Hierophant',
    'Os Enamorados': 'The Lovers',
    'O Carro': 'The Chariot',
    'A Força': 'Strength',
    'O Eremita': 'The Hermit',
    'A Roda da Fortuna': 'Wheel of Fortune',
    'A Justiça': 'Justice',
    'O Pendurado': 'The Hanged Man',
    'A Morte': 'Death',
    'A Temperança': 'Temperance',
    'O Diabo': 'The Devil',
    'A Torre': 'The Tower',
    'A Estrela': 'The Star',
    'A Lua': 'The Moon',
    'O Sol': 'The Sun',
    'O Julgamento': 'Judgement',
    'O Mundo': 'The World',
    // Lenormand
    'O Cavaleiro': 'The Rider',
    'O Trevo': 'The Clover',
    'O Navio': 'The Ship',
    'A Casa': 'The House',
    'A Árvore': 'The Tree',
    'As Nuvens': 'The Clouds',
    'A Serpente': 'The Snake',
    'O Caixão': 'The Coffin',
    'As Flores': 'The Bouquet',
    'A Foice': 'The Scythe',
    'O Chicote': 'The Whip',
    'Os Pássaros': 'The Birds',
    'A Criança': 'The Child',
    'A Raposa': 'The Fox',
    'O Urso': 'The Bear',
    'As Estrelas': 'The Stars',
    'A Cegonha': 'The Stork',
    'O Cão': 'The Dog',
    'O Jardim': 'The Garden',
    'A Montanha': 'The Mountain',
    'O Caminho': 'The Crossroads',
    'O Rato': 'The Mice',
    'O Coração': 'The Heart',
    'O Anel': 'The Ring',
    'O Livro': 'The Book',
    'A Carta': 'The Letter',
    'O Homem': 'The Man',
    'A Mulher': 'The Woman',
    'Os Lírios': 'The Lilies',
    'A Chave': 'The Key',
    'Os Peixes': 'The Fish',
    'A Âncora': 'The Anchor',
    'A Cruz': 'The Cross'
  };
  return mapping[cardName] || cardName;
};

const failedServices = new Set<string>();

export async function generateCardImage(cardName: string, oracleType: string): Promise<{ imageUrl: string, source: 'gemini' | 'huggingface' } | null> {
  const ai = getAI();
  const englishName = getEnglishCardName(cardName);
  
  const isTarot = oracleType.toLowerCase() === 'tarot';
  
  const prompt = isTarot ? `
    Tarot card illustration, dark mystical fantasy painting, highly detailed, painterly brush strokes, textured smoke and marbled background, dramatic cinematic lighting, high contrast, centered subject composition, minimal background elements, sacred atmosphere, moody color grading, ultra detailed.
    Subject: ${englishName}
    Color palette: Deep blues, obsidian, gold highlights, and ethereal mists.
    Mood: intense, spiritual, mysterious, symbolic.
    Style: gothic fantasy art, oil painting, soft glow highlights, volumetric light, subtle particles in air.
    No text, no letters, no watermark, no logo, no signature, no frame inside artwork.
  ` : `
    Lenormand card illustration, Amazonian legends and Brazilian folklore aesthetic, lush tropical rainforest atmosphere, vibrant jungle colors, highly detailed fantasy painting, cinematic lighting, bioluminescent flora, mystical Amazon river, oil painting style, centered symbolic object, dramatic contrast, indigenous sacred energy, ultra detailed, 4k resolution.
    Subject: ${englishName} (transformed into an Amazonian legend version: e.g., Ship as a mystical canoe on a moonlit river, Rider as a jungle warrior on a mystical creature, Clover as a Victoria Amazonica leaf with a spiritual aura, Woman as Iara the river siren, and so on, maintaining the Amazonian folklore theme).
    Color palette: vibrant emerald green, deep river blue, sunset orange, golden sunlight, bioluminescent glows.
    Mood: mystical, ancestral, vibrant, enchanted jungle magic.
    No text, no letters, no watermark, no logo, no signature, no frame inside artwork.
  `;

  // Tentar Gemini primeiro (Frontend)
  if (ai && !failedServices.has('gemini')) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          imageConfig: {
            aspectRatio: "3:4",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return { 
            imageUrl: `data:image/png;base64,${part.inlineData.data}`,
            source: 'gemini'
          };
        }
      }
    } catch (error) {
      console.warn("Gemini image generation failed, marking as disabled for this session.", error);
      failedServices.add('gemini');
    }
  }

  // Fallback para Hugging Face via Servidor
  if (!failedServices.has('huggingface')) {
    try {
      const response = await fetch("/api/generate-image-fallback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          imageUrl: data.imageUrl,
          source: 'huggingface'
        };
      } else {
        const errorText = await response.text();
        console.error("Server fallback failed, marking as disabled for this session:", errorText);
        failedServices.add('huggingface');
      }
    } catch (error) {
      console.error("Error calling server fallback, marking as disabled for this session:", error);
      failedServices.add('huggingface');
    }
  }

  // Last resort fallback to a themed placeholder if all AI services fail
  console.warn(`All AI image services failed for ${cardName}. Using themed placeholder.`);
  const seed = encodeURIComponent(englishName);
  return {
    imageUrl: `https://picsum.photos/seed/${seed}/768/1024?blur=2`,
    source: 'huggingface' // Using huggingface as a generic source for UI to show it's a fallback
  };
}
