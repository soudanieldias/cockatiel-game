import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Calopsita } from '../components/Calopsita';
import { GameHUD } from '../components/GameHUD';
import { SoundToggle } from '../components/SoundToggle';
import { useGameStore } from '../store/gameStore';
import { useSound } from '../hooks/useSound';

export const GameScreen: React.FC = () => {
  const { loadGame, setSoundCallbacks } = useGameStore();
  const { playWin, playLose, startBackgroundMusic } = useSound();

  useEffect(() => {
    // Carregar dados salvos quando a tela for montada
    loadGame();
    
    // Configurar callbacks de som
    setSoundCallbacks(playWin, playLose);
    
    // Iniciar música de background
    startBackgroundMusic();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#87CEEB" />
      
      {/* Fundo animado */}
      <AnimatedBackground />
      
      {/* Calopsita */}
      <Calopsita />
      
      {/* Interface do jogo */}
      <GameHUD />
      
      {/* Controle de som */}
      <SoundToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
}); 