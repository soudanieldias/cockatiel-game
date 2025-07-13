import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useGameStore } from '../store/gameStore';

const { width, height } = Dimensions.get('window');

export const Calopsita: React.FC = () => {
  const { isFlying, multiplier, currentPhrase } = useGameStore();
  
  // Valores animados
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const wingFlap = useSharedValue(0);

  // Animação de voo
  useEffect(() => {
    if (isFlying) {
      // Animação de subida
      translateY.value = withTiming(-height * 0.3, { duration: 2000 });
      
      // Animação de escala (crescimento)
      scale.value = withTiming(1.2, { duration: 2000 });
      
      // Animação de rotação suave
      rotate.value = withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        false
      );
      
      // Animação de bater asas
      wingFlap.value = withRepeat(
        withTiming(1, { duration: 200 }),
        -1,
        true
      );
    } else {
      // Volta ao estado normal
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      rotate.value = withSpring(0);
      wingFlap.value = withSpring(0);
    }
  }, [isFlying]);

  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 10]);
    const wingValue = interpolate(wingFlap.value, [0, 1], [0, 15]);
    
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotateValue}deg` },
        { rotateX: `${wingValue}deg` },
      ],
    };
  });

  const wingStyle = useAnimatedStyle(() => {
    const wingFlapValue = interpolate(wingFlap.value, [0, 1], [0, 30]);
    return {
      transform: [{ rotate: `${wingFlapValue}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Calopsita */}
      <Animated.View style={[styles.calopsita, animatedStyle]}>
        {/* Corpo da calopsita */}
        <View style={styles.body}>
          {/* Cabeça */}
          <View style={styles.head}>
            <View style={styles.eye} />
            <View style={styles.beak} />
          </View>
          
          {/* Asas */}
          <Animated.View style={[styles.wing, styles.wingLeft, wingStyle]} />
          <Animated.View style={[styles.wing, styles.wingRight, wingStyle]} />
          
          {/* Cauda */}
          <View style={styles.tail} />
        </View>
      </Animated.View>
      
      {/* Frase da calopsita */}
      <View style={styles.phraseContainer}>
        <Animated.Text style={styles.phrase}>
          {currentPhrase}
        </Animated.Text>
      </View>
      
      {/* Multiplicador */}
      {isFlying && (
        <View style={styles.multiplierContainer}>
          <Animated.Text style={styles.multiplier}>
            {multiplier.toFixed(2)}x
          </Animated.Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calopsita: {
    position: 'absolute',
    alignItems: 'center',
  },
  body: {
    width: 80,
    height: 60,
    backgroundColor: '#FFD700', // Dourado
    borderRadius: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: 40,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    position: 'absolute',
    top: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  beak: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF6B35',
    position: 'absolute',
    bottom: -5,
  },
  wing: {
    width: 25,
    height: 35,
    backgroundColor: '#FFA500',
    borderRadius: 12,
    position: 'absolute',
    top: 5,
  },
  wingLeft: {
    left: -15,
    transform: [{ rotate: '-15deg' }],
  },
  wingRight: {
    right: -15,
    transform: [{ rotate: '15deg' }],
  },
  tail: {
    width: 20,
    height: 30,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    position: 'absolute',
    bottom: -15,
    right: 10,
    transform: [{ rotate: '45deg' }],
  },
  phraseContainer: {
    position: 'absolute',
    top: height * 0.2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: width * 0.8,
  },
  phrase: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  multiplierContainer: {
    position: 'absolute',
    top: height * 0.1,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  multiplier: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 