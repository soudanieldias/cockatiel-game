import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playWhistle = async () => {
    if (!soundEnabled) return;
    
    try {
      // Simular som de assobio (em um app real, você teria um arquivo de áudio)
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { shouldPlay: true }
      );
      
      await sound.playAsync();
      
      // Limpar o som após tocar
      sound.setOnPlaybackStatusUpdate((status) => {
        if ('isLoaded' in status && status.isLoaded && 'didJustFinish' in status && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Erro ao tocar som:', error);
    }
  };

  const playWin = async () => {
    if (!soundEnabled) return;
    
    try {
      // Simular som de vitória
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { shouldPlay: true }
      );
      
      await sound.playAsync();
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if ('isLoaded' in status && status.isLoaded && 'didJustFinish' in status && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Erro ao tocar som de vitória:', error);
    }
  };

  const playLose = async () => {
    if (!soundEnabled) return;
    
    try {
      // Simular som de derrota
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { shouldPlay: true }
      );
      
      await sound.playAsync();
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if ('isLoaded' in status && status.isLoaded && 'didJustFinish' in status && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Erro ao tocar som de derrota:', error);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return {
    soundEnabled,
    playWhistle,
    playWin,
    playLose,
    toggleSound,
  };
}; 