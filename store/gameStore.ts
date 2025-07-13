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
  
  // Callbacks de som
  onWin?: () => void;
  onLose?: () => void;
  
  // Ações
  startGame: () => void;
  stopGame: () => void;
  whistle: () => void;
  setBetAmount: (amount: number) => void;
  loadGame: () => Promise<void>;
  saveGame: () => Promise<void>;
  setSoundCallbacks: (onWin: () => void, onLose: () => void) => void;
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
    
    // Descontar as sementes imediatamente ao iniciar o jogo
    const newTotalSeeds = totalSeeds - betAmount;
    
    set({ 
      running: true, 
      multiplier: 1,
      currentSeeds: 0,
      isFlying: true,
      totalSeeds: newTotalSeeds,
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
        // Tocar som de derrota
        const { onLose } = get();
        if (onLose) onLose();
      }
    }, 100);
  },
  
  stopGame: () => {
    const { running, currentSeeds, totalSeeds, betAmount, onWin } = get();
    
    if (running) {
      // Adicionar as sementes ganhas ao total atual
      const newTotalSeeds = totalSeeds + currentSeeds;
      set({ 
        running: false, 
        isFlying: false,
        totalSeeds: newTotalSeeds,
        currentPhrase: `🦜 Ganhei ${currentSeeds} sementes!`
      });
      get().saveGame();
      // Tocar som de vitória
      if (onWin) onWin();
    }
  },
  
  whistle: () => {
    const { running, multiplier } = get();
    if (running) {
      const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
      set({ currentPhrase: randomPhrase });
    }
  },
  
  setBetAmount: (amount: number) => {
    set({ betAmount: amount });
  },
  
  setSoundCallbacks: (onWin: () => void, onLose: () => void) => {
    set({ onWin, onLose });
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