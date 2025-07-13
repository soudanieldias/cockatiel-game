import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameState {
  // Estado do jogo
  multiplier: number;
  running: boolean;
  betAmount: number;
  totalSeeds: number;
  currentSeeds: number;
  
  // Estado da calopsita
  calopsitaPosition: { x: number; y: number };
  isFlying: boolean;
  
  // Frases engraçadas
  currentPhrase: string;
  
  // Ações
  startGame: () => void;
  stopGame: () => void;
  whistle: () => void;
  setBetAmount: (amount: number) => void;
  loadGame: () => Promise<void>;
  saveGame: () => Promise<void>;
}

const funnyPhrases = [
  "🎵 Piado musical!",
  "🎶 Só mais um assobio!",
  "🦜 Calopsita cantora!",
  "🎤 Show de talentos!",
  "🎵 Voz de ouro!",
  "🦜 Rainha do assobio!",
  "🎶 Estrela do momento!",
  "🎤 Calopsita famosa!",
  "🎵 Hit do verão!",
  "🦜 Sensação da internet!"
];

export const useGameStore = create<GameState>((set, get) => ({
  // Estado inicial
  multiplier: 1,
  running: false,
  betAmount: 10,
  totalSeeds: 1000,
  currentSeeds: 0,
  calopsitaPosition: { x: 0.5, y: 0.7 },
  isFlying: false,
  currentPhrase: "🦜 Olá! Vou cantar pra você!",
  
  // Ações
  startGame: () => {
    const { betAmount, totalSeeds } = get();
    
    if (betAmount > totalSeeds) {
      set({ currentPhrase: "🦜 Não tenho sementes suficientes!" });
      return;
    }
    
    set({ 
      running: true, 
      multiplier: 1,
      currentSeeds: 0,
      isFlying: true,
      currentPhrase: "🦜 Vou voar alto!"
    });
    
    let value = 1;
    const interval = setInterval(() => {
      const { running } = get();
      if (!running) {
        clearInterval(interval);
        return;
      }
      
      value += 0.05 + Math.random() * 0.2;
      const newMultiplier = Number(value.toFixed(2));
      
      set({ 
        multiplier: newMultiplier,
        currentSeeds: Math.floor(betAmount * newMultiplier)
      });
      
      // Chance da calopsita fugir (aumenta com o tempo)
      const escapeChance = Math.min(0.01 + (newMultiplier - 1) * 0.005, 0.1);
      if (Math.random() < escapeChance) {
        clearInterval(interval);
        set({ 
          running: false, 
          isFlying: false,
          currentPhrase: "🦜 Ops! Fugi voando!"
        });
        get().saveGame();
      }
    }, 100);
  },
  
  stopGame: () => {
    const { running, currentSeeds, totalSeeds, betAmount } = get();
    
    if (running) {
      const newTotalSeeds = totalSeeds - betAmount + currentSeeds;
      set({ 
        running: false, 
        isFlying: false,
        totalSeeds: newTotalSeeds,
        currentPhrase: `🦜 Ganhei ${currentSeeds} sementes!`
      });
      get().saveGame();
    }
  },
  
  whistle: () => {
    const { running, multiplier } = get();
    if (running) {
      const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
      set({ currentPhrase: randomPhrase });
      // playWhistle();
    }
  },
  
  setBetAmount: (amount: number) => {
    set({ betAmount: amount });
  },
  
  loadGame: async () => {
    try {
      const savedSeeds = await AsyncStorage.getItem('totalSeeds');
      if (savedSeeds) {
        set({ totalSeeds: parseInt(savedSeeds) });
      }
    } catch (error) {
      console.log('Erro ao carregar jogo:', error);
    }
  },
  
  saveGame: async () => {
    try {
      const { totalSeeds } = get();
      await AsyncStorage.setItem('totalSeeds', totalSeeds.toString());
    } catch (error) {
      console.log('Erro ao salvar jogo:', error);
    }
  }
})); 