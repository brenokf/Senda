
export enum OracleType {
  TAROT = 'tarot',
  LENORMAND = 'lenormand'
}

export enum SpreadLevel {
  SIMPLE = 'simples',
  INTERMEDIATE = 'intermediario',
  ADVANCED = 'avancado'
}

export enum ReadingTheme {
  GENERAL = 'GERAL',
  LOVE = 'AMOR',
  WORK = 'TRABALHO',
  SPIRITUALITY = 'ESPIRITUALIDADE'
}

export interface SpreadPosition {
  nome_da_posicao: string;
  significado: string;
}

export interface Spread {
  id: string;
  nome: string;
  oraculo: OracleType;
  nivel: SpreadLevel;
  numero_cartas: number;
  descricao: string;
  quando_usar: string;
  posicoes: SpreadPosition[];
  tipo_interpretacao: string;
  premium: boolean;
}

export interface Card {
  id: string;
  name: string;
  image?: string;
  meanings: {
    general: string;
    love: string;
    work: string;
    shadow: string;
  };
  journaling: string[];
  advice: string[];
}

export interface Reading {
  id: string;
  date: string;
  oracle: OracleType;
  spreadId: string;
  theme: ReadingTheme;
  question: string;
  cards: string[]; // IDs
  result: string;
}
