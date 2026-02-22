import { Card, ReadingTheme, Spread } from './types';

/**
 * Embaralha o deck usando o algoritmo Fisher-Yates
 */
export function shuffleDeck<T>(deck: T[]): T[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

/**
 * Gera a interpretação baseada no contexto e nas posições da tiragem
 */
export function generateInterpretation(
  cards: Card[],
  theme: ReadingTheme,
  spread: Spread
): string {
  const themeKey = theme.toLowerCase() as keyof Card['meanings'];
  
  const intro = `### Panorama Geral\nAs energias de hoje sugerem uma jornada de ${cards.map(c => c.name.toLowerCase()).join(', ')}. No tema **${theme}**, as cartas indicam uma dinâmica de transformação e aprendizado.\n\n`;

  const details = cards.map((card, i) => {
    const position = spread.posicoes[i] || { nome_da_posicao: `Posição ${i + 1}`, significado: '' };
    const meaning = card.meanings[themeKey] || card.meanings.general;
    
    return `#### ${position.nome_da_posicao}: ${card.name}\n*${position.significado}*\n\n${meaning}`;
  }).join('\n\n');

  const conclusion = `\n\n### Síntese\nO conselho final para você é focar em ${cards[0].advice[0].toLowerCase()}. Lembre-se que as cartas mostram tendências, mas o poder de escolha permanece em suas mãos.`;

  return intro + details + conclusion;
}
