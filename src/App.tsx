import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  History, 
  Settings, 
  ChevronRight, 
  ArrowLeft, 
  RefreshCw,
  Zap,
  Heart,
  Briefcase,
  Coins,
  Compass,
  Book,
  Search
} from 'lucide-react';
import { OracleType, ReadingTheme, Spread, SpreadLevel, Card, Reading } from './types';
import { TAROT_DECK, LENORMAND_DECK } from './data';
import { shuffleDeck, generateInterpretation } from './engine';
import ReactMarkdown from 'react-markdown';
import { generateCardImage, interpretReading, suggestSpreadAI } from './services/aiService';
import { saveImage, getAllImages } from './db';
import SPREADS_DATA from './spreads.json';

const SPREADS = SPREADS_DATA as Spread[];

// --- Utilitários ---

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
};

const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const toRoman = (num: number): string => {
  if (num === 0) return '0';
  const lookup: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = '';
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

const getCardTheme = (id: string) => {
  const num = parseInt(id.split('_')[1]) || 0;
  const themes = [
    'from-blue-600/20 via-slate-950 to-slate-950',
    'from-orange-600/20 via-slate-950 to-slate-950',
    'from-purple-600/20 via-slate-950 to-slate-950',
    'from-emerald-600/20 via-slate-950 to-slate-950',
    'from-rose-600/20 via-slate-950 to-slate-950',
    'from-cyan-600/20 via-slate-950 to-slate-950',
    'from-amber-600/20 via-slate-950 to-slate-950',
  ];
  return themes[num % themes.length];
};

// --- Componentes Menores ---

const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: ["-10%", "110%"],
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-yellow-500/30 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

interface CardUIProps {
  card: Card;
  index: number;
  isRevealed: boolean;
  onReveal: () => void;
  positionName?: string;
}

const CardUI: React.FC<CardUIProps & { imageUrl?: string }> = ({ card, index, isRevealed, onReveal, imageUrl, positionName }) => {
  const cardNum = parseInt(card.id.split('_')[1]) || 0;
  const roman = toRoman(cardNum);
  const themeClass = getCardTheme(card.id);

  return (
    <div className="flex flex-col items-center gap-2">
      {positionName && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-[8px] font-black uppercase tracking-[0.2em] text-yellow-500/60 text-center max-w-[80px] leading-tight h-4"
        >
          {positionName}
        </motion.span>
      )}
      <motion.div 
        layoutId={`card-${index}`}
        initial={{ opacity: 0, y: 50, rotate: -5, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ 
          delay: index * 0.1, 
          type: 'spring', 
          stiffness: 80, 
          damping: 15 
        }}
        className="relative w-28 h-44 sm:w-36 sm:h-56 cursor-pointer perspective-1000"
        onClick={onReveal}
        whileHover={{ scale: 1.05, rotateY: isRevealed ? 180 : 5 }}
        whileTap={{ scale: 0.95 }}
      >
      <motion.div 
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', damping: 15, stiffness: 60 }}
      >
          {/* Verso da Carta */}
          <div className="absolute inset-0 bg-slate-900 border border-yellow-500/20 rounded-xl flex items-center justify-center backface-hidden shadow-2xl">
            <div className="w-full h-full m-1 border border-yellow-500/5 rounded-lg flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950">
              <div className="relative">
                <Sparkles className="text-yellow-500/10 w-12 h-12" />
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 blur-xl bg-yellow-500/5 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        
          {/* Frente da Carta */}
          <div className={`absolute inset-0 bg-slate-950 rounded-xl flex flex-col items-center justify-between p-3 backface-hidden rotate-y-180 shadow-2xl overflow-hidden border border-white/5 bg-gradient-to-b ${themeClass}`}>
           {/* Reveal Glow Effect */}
           {isRevealed && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
               transition={{ duration: 1 }}
               className="absolute inset-0 bg-white/20 blur-3xl z-20 pointer-events-none"
             />
           )}

           {/* Image Background */}
           {imageUrl ? (
             <div className="absolute inset-0 z-0">
               <img src={imageUrl} alt={card.name} className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"></div>
             </div>
           ) : (
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none"></div>
           )}
           
           {/* Roman Numeral */}
           <div className="z-10 text-white/40 font-serif text-sm tracking-[0.2em]">
             {roman}
           </div>

           {/* Illustration Placeholder (only if no image) */}
           {!imageUrl && (
             <div className="flex-1 flex items-center justify-center z-10">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-5xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  {card.id.startsWith('t') ? '⚔️' : '🌿'}
                </motion.div>
             </div>
           )}

           {/* Card Name */}
           <div className="z-10 text-center mt-auto">
             <span className="text-white/80 font-serif text-[10px] uppercase tracking-[0.3em] block leading-tight">
               {card.name}
             </span>
           </div>

           {/* Subtle Glow at bottom */}
           <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
};

// --- Variantes de Animação ---

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 1.02, filter: 'blur(10px)' },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

// --- App Principal ---

export default function App() {
  const [step, setStep] = useState<'home' | 'theme' | 'intent' | 'spread' | 'ritual' | 'interpreting' | 'result' | 'history' | 'deck' | 'cardDetail'>('home');
  const [isShuffling, setIsShuffling] = useState(false);
  const [oracle, setOracle] = useState<OracleType>(OracleType.TAROT);
  const [theme, setTheme] = useState<ReadingTheme>(ReadingTheme.GENERAL);
  const [intent, setIntent] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<Spread>(SPREADS[0]);
  const [shuffledDeck, setShuffledDeck] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [history, setHistory] = useState<Reading[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardForDetail, setSelectedCardForDetail] = useState<Card | null>(null);
  const [selectedHistoryReading, setSelectedHistoryReading] = useState<Reading | null>(null);
  const [dailyCard, setDailyCard] = useState<Card | null>(null);
  const [cardImages, setCardImages] = useState<Record<string, string>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        // Registrar última visita via Cookie (conforme solicitado)
        const lastVisit = getCookie('senda_last_visit');
        if (!lastVisit) {
          console.log("Bem-vindo à sua primeira sessão!");
        }
        setCookie('senda_last_visit', new Date().toISOString(), 30);

        const savedHistory = localStorage.getItem('senda_history');
        if (savedHistory) setHistory(JSON.parse(savedHistory));

        const savedDaily = localStorage.getItem('senda_daily_card');
        const savedDailyDate = localStorage.getItem('senda_daily_date');
        const today = new Date().toLocaleDateString();

        if (savedDaily && savedDailyDate === today) {
          setDailyCard(JSON.parse(savedDaily));
        }

        // Carregar imagens do IndexedDB
        const images = await getAllImages();
        setCardImages(images);

        // Iniciar geração automática de imagens faltantes
        generateMissingImages(images);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const generateMissingImages = async (existingImages: Record<string, string>) => {
    const allCards = [...TAROT_DECK, ...LENORMAND_DECK];
    const missingCards = allCards.filter(card => !existingImages[card.id]);
    
    if (missingCards.length === 0) return;

    setIsGeneratingAll(true);
    setGenerationProgress({ current: 0, total: missingCards.length });

    let consecutiveErrors = 0;

    for (let i = 0; i < missingCards.length; i++) {
      const card = missingCards[i];
      let success = false;
      let retries = 0;
      const maxRetries = 3;

      while (!success && retries < maxRetries) {
        try {
          const result = await generateCardImage(card.name, card.id.startsWith('t') ? 'Tarot' : 'Lenormand');
          if (result) {
            const { imageUrl, source } = result;
            setCardImages(prev => ({ ...prev, [card.id]: imageUrl }));
            await saveImage(card.id, imageUrl);
            success = true;
            consecutiveErrors = 0;
            setIsRateLimited(false);
            setIsUsingFallback(source === 'huggingface');
          } else {
            // Se retornou null, ambos falharam
            throw new Error("Ambos os serviços falharam");
          }
        } catch (error: any) {
          retries++;
          const isQuotaError = error?.message?.includes('429') || error?.status === 429 || JSON.stringify(error).includes('429');
          
          if (isQuotaError) {
            setIsRateLimited(true);
            setIsUsingFallback(true); // Se falhou Gemini por quota, vamos pro fallback
            consecutiveErrors++;
            // Exponential backoff: 30s, 60s, 120s...
            const waitTime = Math.min(30000 * Math.pow(2, consecutiveErrors - 1), 300000); 
            console.warn(`Rate limit hit. Waiting ${waitTime/1000}s before retry...`);
            await new Promise(r => setTimeout(r, waitTime));
          } else {
            console.error(`Error generating image for ${card.name}:`, error);
            setIsUsingFallback(true); // Tentar fallback em outros erros também
            break; 
          }
        }
      }

      setGenerationProgress(prev => ({ ...prev, current: i + 1 }));
      // Base delay between successful requests to be polite to the API
      await new Promise(r => setTimeout(r, 3000));
    }
    setIsGeneratingAll(false);
    setIsRateLimited(false);
    setIsUsingFallback(false);
  };

  // Salvar histórico
  useEffect(() => {
    try {
      localStorage.setItem('senda_history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const getOrGenerateImage = async (card: Card) => {
    try {
      if (cardImages[card.id]) return cardImages[card.id];
      
      const result = await generateCardImage(card.name, card.id.startsWith('t') ? 'Tarot' : 'Lenormand');
      if (result) {
        const { imageUrl } = result;
        setCardImages(prev => ({ ...prev, [card.id]: imageUrl }));
        // Salvar no IndexedDB
        await saveImage(card.id, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.error("Error in getOrGenerateImage:", error);
    }
    return null;
  };

  const revealDailyCard = () => {
    const today = new Date().toLocaleDateString();
    const savedDailyDate = localStorage.getItem('senda_daily_date');

    if (savedDailyDate === today && dailyCard) {
      setSelectedCardForDetail(dailyCard);
      setStep('cardDetail');
      return;
    }

    const allCards = [...TAROT_DECK, ...LENORMAND_DECK];
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    
    setDailyCard(randomCard);
    localStorage.setItem('senda_daily_card', JSON.stringify(randomCard));
    localStorage.setItem('senda_daily_date', today);
    
    setSelectedCardForDetail(randomCard);
    setStep('cardDetail');
  };

  // Iniciar Ritual
  const startRitual = (spread: Spread) => {
    const deck = oracle === OracleType.TAROT ? TAROT_DECK : LENORMAND_DECK;
    const shuffled = shuffleDeck(deck);
    setShuffledDeck(shuffled);
    setSelectedCards(shuffled.slice(0, spread.numero_cartas));
    setRevealedIndices([]);
    setAiInterpretation(null);
    setStep('ritual');
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 2000);
  };

  const suggestSpread = async () => {
    setIsSuggesting(true);
    const filteredSpreads = SPREADS.filter(s => s.oraculo === oracle);
    
    try {
      const suggestedId = await suggestSpreadAI(intent, theme, oracle, filteredSpreads);
      let suggested: Spread | undefined;
      
      if (suggestedId) {
        suggested = filteredSpreads.find(s => s.id === suggestedId);
      }
      
      // Fallback para a lógica manual se a IA falhar ou não encontrar o ID
      if (!suggested) {
        if (theme === ReadingTheme.LOVE) {
          suggested = filteredSpreads.find(s => s.nome.toLowerCase().includes('amor')) || filteredSpreads[0];
        } else if (theme === ReadingTheme.WORK) {
          suggested = filteredSpreads.find(s => s.nome.toLowerCase().includes('carreira') || s.nome.toLowerCase().includes('financeira')) || filteredSpreads[0];
        } else if (theme === ReadingTheme.SPIRITUALITY) {
          suggested = filteredSpreads.find(s => s.nome.toLowerCase().includes('espiritual') || s.nome.toLowerCase().includes('evolução')) || filteredSpreads[0];
        } else {
          suggested = filteredSpreads.find(s => s.numero_cartas === 3) || filteredSpreads[0];
        }
      }
      
      setSelectedSpread(suggested!);
      startRitual(suggested!);
    } catch (error) {
      console.error("Error in suggestSpread:", error);
      const fallback = filteredSpreads.find(s => s.numero_cartas === 3) || filteredSpreads[0];
      setSelectedSpread(fallback);
      startRitual(fallback);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleGetInterpretation = async () => {
    setStep('interpreting');
    setIsInterpreting(true);
    try {
      const result = await interpretReading(selectedCards, theme, selectedSpread, intent);
      setAiInterpretation(result);
      setStep('result');
    } catch (error) {
      console.error("Failed to get AI interpretation:", error);
      setStep('result');
    } finally {
      setIsInterpreting(false);
    }
  };

  const handleReveal = (index: number) => {
    if (!revealedIndices.includes(index)) {
      setRevealedIndices([...revealedIndices, index]);
    }
  };

  useEffect(() => {
    // A transição agora é manual via botão "Ver Interpretação da IA"
  }, [revealedIndices, selectedCards]);

  const saveReading = () => {
    const newReading: Reading = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('pt-BR'),
      oracle,
      spreadId: selectedSpread.id,
      theme,
      question: intent,
      cards: selectedCards.map(c => c.id),
      result: aiInterpretation || generateInterpretation(selectedCards, theme, selectedSpread)
    };
    setHistory([newReading, ...history]);
  };

  // --- Renderização de Telas ---

  const renderHome = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-8 p-6 max-w-md mx-auto"
    >
      <header className="text-center space-y-2 relative">
        <div className="absolute top-0 right-0">
          {isGeneratingAll && (
            <div className="flex flex-col items-end">
              <div className={`flex items-center gap-2 ${isRateLimited || isUsingFallback ? 'text-rose-500' : 'text-yellow-500'}`}>
                <RefreshCw className={isRateLimited ? '' : 'animate-spin'} size={12} />
                <span className="text-[8px] font-bold uppercase tracking-widest">
                  {isRateLimited ? 'Aguardando Quota...' : isUsingFallback ? 'Usando Fallback...' : 'Ilustrando...'}
                </span>
              </div>
              <div className="w-16 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className={`h-full ${isRateLimited || isUsingFallback ? 'bg-rose-500/50' : 'bg-yellow-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                />
              </div>
              <span className="text-[6px] text-slate-500 mt-0.5">{generationProgress.current}/{generationProgress.total}</span>
            </div>
          )}
        </div>
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-black tracking-tighter text-yellow-500 uppercase"
        >
          Senda
        </motion.h1>
        <p className="text-slate-400 text-sm font-light">Seu portal para a sabedoria ancestral</p>
      </header>

      <motion.div variants={containerVariants} className="grid gap-4">
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setOracle(OracleType.TAROT); setStep('theme'); }}
          className="group relative overflow-hidden bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between hover:border-yellow-500/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
              <Zap className="text-yellow-500" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Tarot de Marselha</h3>
              <p className="text-xs text-slate-500">78 cartas de arquétipos profundos</p>
            </div>
          </div>
          <ChevronRight className="text-slate-700 group-hover:text-yellow-500 transition-colors" />
        </motion.button>

        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setOracle(OracleType.LENORMAND); setStep('theme'); }}
          className="group relative overflow-hidden bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between hover:border-yellow-500/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Sparkles className="text-emerald-500" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Baralho Cigano</h3>
              <p className="text-xs text-slate-500">36 cartas objetivas e práticas</p>
            </div>
          </div>
          <ChevronRight className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
        </motion.button>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500">Carta do Dia</h4>
          <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full font-bold">GRÁTIS</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-16 h-24 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
              {dailyCard ? (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-900 text-2xl">
                  🔮
                </div>
              ) : (
                <Sparkles className="text-slate-600 w-6 h-6" />
              )}
           </div>
           <div>
              <p className="text-sm font-medium">
                {dailyCard ? `Sua carta de hoje é ${dailyCard.name}` : 'O que o universo tem para você hoje?'}
              </p>
              <button 
                onClick={revealDailyCard}
                className="text-yellow-500 text-xs font-bold mt-2 flex items-center gap-1 hover:translate-x-1 transition-transform"
              >
                {dailyCard ? 'VER DETALHES' : 'REVELAR AGORA'} <ChevronRight size={12} />
              </button>
           </div>
        </div>
      </motion.div>

      <nav className="flex justify-around items-center pt-4 border-t border-slate-800">
        <button onClick={() => setStep('home')} className={`flex flex-col items-center gap-1 transition-all ${step === 'home' ? 'text-yellow-500 scale-110' : 'text-slate-500 hover:text-white'}`}>
          <Compass size={20} />
          <span className="text-[10px] font-bold uppercase">Início</span>
        </button>
        <button onClick={() => setStep('deck')} className={`flex flex-col items-center gap-1 transition-all ${step === 'deck' ? 'text-yellow-500 scale-110' : 'text-slate-500 hover:text-white'}`}>
          <Book size={20} />
          <span className="text-[10px] font-bold uppercase">Biblioteca</span>
        </button>
        <button onClick={() => setStep('history')} className={`flex flex-col items-center gap-1 transition-all ${step === 'history' ? 'text-yellow-500 scale-110' : 'text-slate-500 hover:text-white'}`}>
          <History size={20} />
          <span className="text-[10px] font-bold uppercase">Histórico</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-white hover:scale-110 transition-all">
          <Settings size={20} />
          <span className="text-[10px] font-bold uppercase">Ajustes</span>
        </button>
      </nav>
    </motion.div>
  );

  const renderTheme = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 max-w-md mx-auto space-y-8"
    >
      <button onClick={() => setStep('home')} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Sobre o que vamos falar?</h2>
        <p className="text-slate-400 text-sm">Escolha um tema para direcionar a energia da leitura.</p>
      </div>

      <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
        {[
          { id: ReadingTheme.GENERAL, icon: Compass, label: 'Geral', color: 'slate' },
          { id: ReadingTheme.LOVE, icon: Heart, label: 'Amor', color: 'rose' },
          { id: ReadingTheme.WORK, icon: Briefcase, label: 'Trabalho', color: 'blue' },
          { id: ReadingTheme.SPIRITUALITY, icon: Sparkles, label: 'Espiritual', color: 'purple' },
        ].map((t) => (
          <motion.button 
            key={t.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setTheme(t.id); setStep('intent'); }}
            className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${theme === t.id ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
          >
            <t.icon size={32} />
            <span className="font-bold text-sm">{t.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderIntent = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 max-w-md mx-auto space-y-8"
    >
      <button onClick={() => setStep('theme')} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Qual sua intenção?</h2>
        <p className="text-slate-400 text-sm">Escreva sua pergunta ou apenas foque no que deseja saber.</p>
      </div>

      <motion.textarea 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        value={intent}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIntent(e.target.value)}
        placeholder="Ex: Como será meu próximo mês no trabalho?"
        className="w-full h-32 bg-slate-900 border border-slate-800 rounded-3xl p-4 text-white focus:border-yellow-500 outline-none transition-all resize-none shadow-inner"
      />

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setStep('spread')}
        className="w-full bg-slate-900 border border-slate-800 text-white font-bold py-4 rounded-3xl transition-all uppercase tracking-widest text-sm"
      >
        Escolher Tiragem Manualmente
      </motion.button>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSuggesting}
        onClick={suggestSpread}
        className="w-full bg-yellow-500 text-slate-900 font-black py-5 rounded-3xl shadow-lg shadow-yellow-500/20 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {isSuggesting ? (
          <>
            <RefreshCw className="animate-spin" size={20} />
            Analisando Destino...
          </>
        ) : (
          <>Sugerir Melhor Tiragem</>
        )}
      </motion.button>
    </motion.div>
  );

  const renderSpreadSelection = () => {
    const filteredSpreads = SPREADS.filter(s => s.oraculo === oracle);
    
    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 max-w-md mx-auto space-y-8 pb-24"
      >
        <button onClick={() => setStep('intent')} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Escolha a Tiragem</h2>
          <p className="text-slate-400 text-sm">Selecione o método que melhor se adapta à sua dúvida.</p>
        </div>

        <div className="space-y-8">
          {[SpreadLevel.SIMPLE, SpreadLevel.INTERMEDIATE, SpreadLevel.ADVANCED].map(level => {
            const levelSpreads = filteredSpreads.filter(s => s.nivel === level);
            if (levelSpreads.length === 0) return null;

            return (
              <div key={level} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">
                  Nível {level}
                </h3>
                <div className="grid gap-3">
                  {levelSpreads.map(s => (
                    <motion.button
                      key={s.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedSpread(s); startRitual(s); }}
                      className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-left hover:border-yellow-500/50 transition-all group relative"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-100">{s.nome}</h4>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                          {s.numero_cartas} cartas
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-2">{s.descricao}</p>
                      {s.premium && (
                        <div className="absolute top-2 right-2 -translate-y-1/2 translate-x-1/2">
                           <span className="bg-yellow-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">PRO</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderRitual = () => {
    const isAllRevealed = revealedIndices.length === selectedCards.length && selectedCards.length > 0;

    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-start p-6 pt-12 space-y-8 overflow-y-auto"
      >
        {/* Atmospheric Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
          <Particles />
        </div>

        <div className="text-center space-y-2 z-10">
          <h2 className="text-xl font-bold text-yellow-500 uppercase tracking-widest">
            {isShuffling ? 'Embaralhando...' : selectedSpread.nome}
          </h2>
          <p className="text-slate-500 text-sm">
            {isShuffling ? 'Conectando com as energias...' : isAllRevealed ? 'Todas as cartas reveladas' : 'Toque nas cartas para revelá-las'}
          </p>
        </div>

        <div className="relative w-full z-10 flex flex-col items-center">
          <AnimatePresence>
            {isShuffling ? (
              <div className="h-64 flex items-center justify-center">
                <div className="relative">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.8 }}
                      animate={{ 
                        x: [0, (i % 2 === 0 ? 120 : -120), 0],
                        y: [0, (i < 4 ? 60 : -60), 0],
                        rotate: [0, 360, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-40 bg-slate-800 border border-yellow-500/30 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                    >
                      <div className="w-full h-full m-1 border border-yellow-500/5 rounded-lg bg-slate-900/50 flex items-center justify-center">
                        <Sparkles className="text-yellow-500/5 w-8 h-8" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className={`grid gap-4 sm:gap-6 justify-center items-start w-full max-w-4xl px-2 sm:px-4 pb-32 ${
                  selectedCards.length === 1 ? 'grid-cols-1' : 
                  selectedCards.length === 2 ? 'grid-cols-2' : 
                  selectedCards.length === 3 ? 'grid-cols-3' : 
                  selectedCards.length === 5 ? 'grid-cols-2 sm:grid-cols-3' : 
                  'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                }`}
              >
                {selectedCards.map((card: Card, i: number) => (
                  <div key={card.id + i} className={
                    selectedCards.length === 5 && i === 3 ? 'col-start-2' : 
                    selectedCards.length === 5 && i === 4 ? 'col-start-2' : ''
                  }>
                    <CardUI 
                      card={card} 
                      index={i} 
                      isRevealed={revealedIndices.includes(i)}
                      onReveal={() => {
                        handleReveal(i);
                        getOrGenerateImage(card);
                      }}
                      imageUrl={cardImages[card.id]}
                      positionName={selectedSpread.posicoes[i]?.nome_da_posicao}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isAllRevealed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-0 w-full px-6 z-20"
          >
            <button 
              onClick={handleGetInterpretation}
              className="w-full bg-yellow-500 text-slate-900 font-black py-5 rounded-3xl shadow-2xl shadow-yellow-500/40 uppercase tracking-widest flex items-center justify-center gap-3"
            >
              <Sparkles size={20} /> Ver Interpretação da IA
            </button>
          </motion.div>
        )}

        {!isAllRevealed && !isShuffling && (
          <div className="flex items-center gap-2 text-slate-600 z-10">
            <RefreshCw className="animate-spin-slow" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Energizando o Deck...</span>
          </div>
        )}
      </motion.div>
    );
  };

  const renderInterpreting = () => {
    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8 z-50"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent blur-3xl"></div>
          <Particles />
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-2 border-dashed border-yellow-500/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border border-dashed border-yellow-500/10 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw className="animate-spin text-yellow-500" size={40} />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-yellow-500 uppercase tracking-[0.3em] animate-pulse">
              Sincronizando Destinos
            </h2>
            <p className="text-slate-500 text-xs max-w-[240px] leading-relaxed">
              O oráculo digital está tecendo os fios do tempo para revelar sua mensagem...
            </p>
          </div>

          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="w-1.5 h-1.5 bg-yellow-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderResult = () => {
    if (selectedCards.length === 0) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <Sparkles className="text-slate-800" size={48} />
          <p className="text-slate-500">Nenhuma carta selecionada para interpretação.</p>
          <button onClick={() => setStep('home')} className="text-yellow-500 font-bold uppercase tracking-widest text-xs">Voltar ao Início</button>
        </div>
      );
    }

    const interpretation = generateInterpretation(selectedCards, theme, selectedSpread);
    
    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-slate-950 p-6 space-y-8 pb-32"
      >
        <header className="flex items-center justify-between">
          <button onClick={() => { saveReading(); setStep('home'); }} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
            <ArrowLeft size={16} /> Finalizar
          </button>
          <div className="text-right">
            <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{oracle}</span>
            <p className="text-xs text-slate-500">{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </header>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-slate-100">{selectedSpread.nome}</h2>
          <p className="text-slate-500 text-xs italic">"{intent || 'Foco Espiritual'}"</p>
        </div>

        <motion.div 
          variants={containerVariants}
          className={`grid gap-3 sm:gap-4 py-6 px-2 sm:px-4 justify-center ${
            selectedCards.length === 1 ? 'grid-cols-1' : 
            selectedCards.length === 2 ? 'grid-cols-2' : 
            selectedCards.length === 3 ? 'grid-cols-3' : 
            selectedCards.length <= 6 ? 'grid-cols-2 sm:grid-cols-3' : 
            'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9'
          }`}
        >
          {selectedCards.map((card: Card, i: number) => {
            const cardNum = parseInt(card.id.split('_')[1]) || 0;
            const roman = toRoman(cardNum);
            const themeClass = getCardTheme(card.id);

            return (
              <motion.div 
                key={card.id + i} 
                variants={itemVariants}
                className="flex flex-col items-center gap-2"
              >
                <motion.div 
                  whileHover={{ y: -5, scale: 1.05 }}
                  onClick={() => { setSelectedCardForDetail(card); setStep('cardDetail'); }}
                  className={`w-20 h-32 sm:w-24 sm:h-40 bg-slate-950 rounded-xl flex flex-col items-center justify-between p-2 text-white shadow-2xl border border-white/5 relative overflow-hidden bg-gradient-to-b cursor-pointer ${themeClass}`}
                >
                  {cardImages[card.id] ? (
                    <div className="absolute inset-0 z-0">
                      <img src={cardImages[card.id]} alt={card.name} className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none"></div>
                  )}
                  <span className="z-10 text-[6px] font-serif tracking-[0.2em] text-white/40">{roman}</span>
                  {!cardImages[card.id] && <span className="z-10 text-xl">{card.id.startsWith('t') ? '⚔️' : '🌿'}</span>}
                  <span className="z-10 text-[6px] font-serif uppercase tracking-[0.2em] text-center text-white/80 leading-tight mt-auto">
                    {card.name}
                  </span>
                </motion.div>
                <div className="text-center space-y-0.5 max-w-[80px]">
                  <span className="text-[8px] text-yellow-500 font-black uppercase tracking-widest block truncate">
                    {selectedSpread.posicoes[i]?.nome_da_posicao || `Posição ${i+1}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-6">
          <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
            <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> {isInterpreting ? 'Sincronizando com o Oráculo...' : 'Interpretação Final'}
            </h3>
            
            {isInterpreting && (
              <div className="flex items-center gap-3 py-2 px-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mb-4">
                <RefreshCw className="animate-spin text-yellow-500" size={14} />
                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider animate-pulse">
                  A IA está aprofundando esta leitura...
                </p>
              </div>
            )}

            <div className="text-slate-200 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
              {aiInterpretation ? (
                <ReactMarkdown>{aiInterpretation}</ReactMarkdown>
              ) : (
                <div className="whitespace-pre-line opacity-80">
                  {interpretation}
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <h3 className="text-emerald-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <Compass size={14} /> Conselhos do Oráculo
              </h3>
              <div className="grid gap-4">
                {selectedCards.map((card, idx) => (
                  <div key={card.id + idx} className="space-y-2">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{card.name}</span>
                    <ul className="space-y-1">
                      {card.advice.map((a, i) => (
                        <li key={i} className="text-slate-300 text-xs flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <h3 className="text-rose-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} /> Sombras & Alertas
              </h3>
              <div className="space-y-4">
                {selectedCards.map((card, idx) => (
                  <div key={card.id + idx} className="space-y-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{card.name}</span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {card.meanings.shadow}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {selectedCards.length > 0 && (
            <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <h3 className="text-purple-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <History size={14} /> Journaling (Reflexão)
              </h3>
              <div className="space-y-3">
                {selectedCards[0].journaling.map((q, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl text-slate-400 text-[10px] italic border border-slate-800">
                    "{q}"
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950 to-transparent">
           <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { saveReading(); setStep('home'); }}
            className="w-full bg-slate-100 text-slate-950 font-black py-4 rounded-2xl uppercase tracking-widest text-sm shadow-xl"
           >
             Salvar no Histórico
           </motion.button>
        </div>
      </motion.div>
    );
  };

  const renderDeck = () => {
    const currentDeck = oracle === OracleType.TAROT ? TAROT_DECK : LENORMAND_DECK;
    const filteredCards = currentDeck.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 max-w-md mx-auto space-y-8 pb-24"
      >
        <header className="flex items-center justify-between">
          <button onClick={() => setStep('home')} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
            <ArrowLeft size={16} /> Voltar
          </button>
          <div className="flex items-center gap-4">
            {isGeneratingAll && (
              <div className="flex flex-col items-end">
                <div className={`flex items-center gap-1 ${isRateLimited || isUsingFallback ? 'text-rose-500' : 'text-yellow-500'}`}>
                  <RefreshCw className={isRateLimited ? '' : 'animate-spin'} size={10} />
                  <span className="text-[7px] font-bold uppercase tracking-widest">
                    {isRateLimited ? 'Quota...' : isUsingFallback ? 'Fallback...' : 'Ilustrando...'}
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-slate-800 rounded-full mt-0.5 overflow-hidden">
                  <motion.div 
                    className={`h-full ${isRateLimited || isUsingFallback ? 'bg-rose-500/50' : 'bg-yellow-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => setOracle(OracleType.TAROT)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${oracle === OracleType.TAROT ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}
              >
                Tarot
              </button>
              <button 
                onClick={() => setOracle(OracleType.LENORMAND)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${oracle === OracleType.LENORMAND ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}
              >
                Cigano
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Biblioteca de Cartas</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="Buscar carta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:border-yellow-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {filteredCards.map((card) => {
            const cardNum = parseInt(card.id.split('_')[1]) || 0;
            const roman = toRoman(cardNum);
            const themeClass = getCardTheme(card.id);

            return (
              <motion.div 
                key={card.id}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => { setSelectedCardForDetail(card); setStep('cardDetail'); }}
                className={`aspect-[2/3] bg-slate-950 border border-white/5 rounded-xl p-2 flex flex-col items-center justify-between text-center group cursor-pointer hover:border-yellow-500/50 transition-all relative overflow-hidden bg-gradient-to-b ${themeClass}`}
              >
                {cardImages[card.id] ? (
                  <div className="absolute inset-0 z-0">
                    <img src={cardImages[card.id]} alt={card.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none"></div>
                )}
                <span className="z-10 text-[6px] font-serif tracking-widest text-white/30">{roman}</span>
                {!cardImages[card.id] && (
                  <span className="z-10 text-xl group-hover:scale-125 transition-transform">
                    {card.id.startsWith('t') ? '⚔️' : '🌿'}
                  </span>
                )}
                <span className="z-10 text-[6px] font-serif uppercase tracking-[0.1em] text-white/60 group-hover:text-white transition-colors leading-tight mt-auto">
                  {card.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderCardDetail = () => {
    if (!selectedCardForDetail) return null;

    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 max-w-md mx-auto space-y-8 pb-24"
      >
        <button onClick={() => setStep('deck')} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
          <ArrowLeft size={16} /> Voltar à Biblioteca
        </button>

        <div className="flex flex-col items-center gap-6">
          <motion.div 
            layoutId={`card-${selectedCardForDetail.id}`}
            className={`w-48 h-80 bg-slate-950 rounded-3xl flex flex-col items-center justify-between p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden bg-gradient-to-b ${getCardTheme(selectedCardForDetail.id)}`}
          >
            {cardImages[selectedCardForDetail.id] ? (
              <div className="absolute inset-0 z-0">
                <img src={cardImages[selectedCardForDetail.id]} alt={selectedCardForDetail.name} className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"></div>
              </div>
            ) : (
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none"></div>
            )}
            <span className="z-10 text-sm font-serif tracking-[0.3em] text-white/40">
              {toRoman(parseInt(selectedCardForDetail.id.split('_')[1]) || 0)}
            </span>
            {!cardImages[selectedCardForDetail.id] && (
              <span className="z-10 text-7xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {selectedCardForDetail.id.startsWith('t') ? '⚔️' : '🌿'}
              </span>
            )}
            <span className="z-10 text-[10px] font-serif uppercase tracking-[0.4em] text-center text-white/90 leading-relaxed mt-auto">
              {selectedCardForDetail.name}
            </span>
          </motion.div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-serif tracking-tight">{selectedCardForDetail.name}</h2>
            <p className="text-yellow-500/60 text-xs uppercase tracking-[0.2em] font-bold">{oracle}</p>
            
            {!cardImages[selectedCardForDetail.id] && isGeneratingAll && (
              <div className={`${isRateLimited || isUsingFallback ? 'text-rose-500' : 'text-yellow-500'} text-[10px] font-bold py-2 px-4 flex items-center gap-2 mx-auto justify-center`}>
                <RefreshCw className={isRateLimited ? '' : 'animate-spin'} size={12} /> 
                {isRateLimited ? 'AGUARDANDO QUOTA DO SISTEMA...' : isUsingFallback ? 'USANDO SERVIÇO DE BACKUP (LENTO)...' : 'ILUSTRAÇÃO EM FILA...'}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
            <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> Significado Geral
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {selectedCardForDetail.meanings.general}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
              <h4 className="text-rose-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                <Heart size={12} /> Amor
              </h4>
              <p className="text-slate-300 text-[11px] leading-tight">
                {selectedCardForDetail.meanings.love}
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
              <h4 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                <Briefcase size={12} /> Trabalho
              </h4>
              <p className="text-slate-300 text-[11px] leading-tight">
                {selectedCardForDetail.meanings.work}
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <h3 className="text-rose-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} /> Lado Sombrio
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {selectedCardForDetail.meanings.shadow}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h3 className="text-emerald-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Compass size={14} /> Conselhos
            </h3>
            <ul className="space-y-2">
              {selectedCardForDetail.advice.map((a, i) => (
                <li key={i} className="text-slate-300 text-xs flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderHistory = () => {
    if (selectedHistoryReading) {
      const spread = SPREADS.find(s => s.id === selectedHistoryReading.spreadId);
      const cards = selectedHistoryReading.cards.map(id => 
        [...TAROT_DECK, ...LENORMAND_DECK].find(c => c.id === id)
      ).filter(Boolean) as Card[];

      return (
        <motion.div 
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen bg-slate-950 p-6 space-y-8 pb-24"
        >
          <header className="flex items-center justify-between">
            <button onClick={() => setSelectedHistoryReading(null)} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
              <ArrowLeft size={16} /> Voltar
            </button>
            <div className="text-right">
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{selectedHistoryReading.oracle}</span>
              <p className="text-xs text-slate-500">{selectedHistoryReading.date}</p>
            </div>
          </header>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-slate-100">{spread?.nome || 'Tiragem'}</h2>
            <p className="text-slate-500 text-xs italic">"{selectedHistoryReading.question || 'Foco Espiritual'}"</p>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-4">
            {cards.map((card, i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                <div className={`w-12 h-20 bg-slate-900 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center`}>
                  {cardImages[card.id] ? (
                    <img src={cardImages[card.id]} alt={card.name} className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <span className="text-lg">{card.id.startsWith('t') ? '⚔️' : '🌿'}</span>
                  )}
                </div>
                <span className="text-[6px] text-slate-500 uppercase tracking-tighter truncate w-12 text-center">{card.name}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> Interpretação Salva
            </h3>
            <div className="text-slate-200 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{selectedHistoryReading.result}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 max-w-md mx-auto space-y-8"
      >
        <header className="flex items-center justify-between">
          <button onClick={() => setStep('home')} className="text-slate-500 flex items-center gap-2 text-sm hover:text-white transition-colors">
            <ArrowLeft size={16} /> Voltar
          </button>
          <h2 className="text-xl font-bold">Histórico</h2>
        </header>

        {history.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 space-y-4"
          >
            <History className="mx-auto text-slate-800" size={48} />
            <p className="text-slate-500 text-sm">Nenhuma leitura salva ainda.</p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} className="space-y-4">
            {history.map((r) => {
              const spread = SPREADS.find(s => s.id === r.spreadId);
              return (
                <motion.div 
                  key={r.id} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedHistoryReading(r)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg cursor-pointer hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{r.oracle} • {spread?.nome || 'Tiragem'}</span>
                      <h4 className="font-bold text-sm">{r.theme}</h4>
                    </div>
                    <span className="text-[10px] text-slate-500">{r.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 italic">"{r.question || 'Sem pergunta registrada'}"</p>
                  <div className="flex gap-1">
                    {r.cards.map((c, i) => (
                      <div key={i} className="w-6 h-9 bg-slate-800 rounded border border-slate-700 flex items-center justify-center overflow-hidden">
                        {cardImages[c] ? (
                          <img src={cardImages[c]} className="w-full h-full object-cover opacity-40" />
                        ) : (
                          <div className="w-full h-full bg-slate-700"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-yellow-500/30">
      {/* Global Magical Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      </div>
      
      <AnimatePresence mode="wait">
        {step === 'home' && renderHome()}
        {step === 'theme' && renderTheme()}
        {step === 'intent' && renderIntent()}
        {step === 'spread' && renderSpreadSelection()}
        {step === 'ritual' && renderRitual()}
        {step === 'interpreting' && renderInterpreting()}
        {step === 'result' && renderResult()}
        {step === 'history' && renderHistory()}
        {step === 'deck' && renderDeck()}
        {step === 'cardDetail' && renderCardDetail()}
      </AnimatePresence>
    </div>
  );
}
