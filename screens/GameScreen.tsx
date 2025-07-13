import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Calopsita } from '../components/Calopsita';
import { GameHUD } from '../components/GameHUD';
import { useGameStore } from '../store/gameStore';

export const GameScreen: React.FC = () => {
  const { loadGame } = useGameStore();

  useEffect(() => {
    // Carregar dados salvos quando a tela for montada
    loadGame();
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
}); 