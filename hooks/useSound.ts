import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(null);

  // Iniciar som de background
  const startBackgroundMusic = async () => {
    if (!soundEnabled) return;
    
    try {
      // Parar música anterior se existir
      if (backgroundSound) {
        await backgroundSound.stopAsync();
        await backgroundSound.unloadAsync();
      }
      
      // Usar arquivo local de background
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/background.mp3'),
        { 
          shouldPlay: true, 
          volume: 0.3,
          isLooping: true,
          isMuted: false
        }
      );
      
      setBackgroundSound(sound);
    } catch (error) {
      console.log('Erro ao tocar música de background:', error);
    }
  };

  // Parar som de background
  const stopBackgroundMusic = async () => {
    if (backgroundSound) {
      try {
        await backgroundSound.stopAsync();
        await backgroundSound.unloadAsync();
        setBackgroundSound(null);
      } catch (error) {
        console.log('Erro ao parar música de background:', error);
      }
    }
  };

  // Limpar som de background quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (backgroundSound) {
        backgroundSound.unloadAsync();
      }
    };
  }, []);

  const playWhistle = async () => {
    if (!soundEnabled) return;
    
    try {
      // Usar arquivo local de assobio
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/pew.mp3'),
        { 
          shouldPlay: true, 
          volume: 0.5,
          rate: 1.0
        }
      );
      
      await sound.playAsync();
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if ('isLoaded' in status && status.isLoaded && 'didJustFinish' in status && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Erro ao tocar som de assobio:', error);
    }
  };

  const playWin = async () => {
    if (!soundEnabled) return;
    
    try {
      // Som de vitória usando arquivo local
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/pew.mp3'),
        { 
          shouldPlay: true, 
          volume: 0.7,
          rate: 1.2
        }
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
      // Som de derrota usando arquivo local
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/gameover.mp3'),
        { 
          shouldPlay: true, 
          volume: 0.6,
          rate: 1.0
        }
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

  const toggleSound = async () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    
    if (newSoundEnabled) {
      await startBackgroundMusic();
    } else {
      await stopBackgroundMusic();
    }
  };

  return {
    soundEnabled,
    playWhistle,
    playWin,
    playLose,
    toggleSound,
    startBackgroundMusic,
    stopBackgroundMusic,
  };
}; 