import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const AnimatedBackground: React.FC = () => {
  // Valores animados para as nuvens
  const cloud1X = useSharedValue(0);
  const cloud2X = useSharedValue(0);
  const cloud3X = useSharedValue(0);
  const sunRotation = useSharedValue(0);

  useEffect(() => {
    // Animação das nuvens
    cloud1X.value = withRepeat(
      withTiming(width + 100, { duration: 15000 }),
      -1,
      false
    );
    
    cloud2X.value = withRepeat(
      withTiming(width + 100, { duration: 20000 }),
      -1,
      false
    );
    
    cloud3X.value = withRepeat(
      withTiming(width + 100, { duration: 25000 }),
      -1,
      false
    );

    // Animação do sol
    sunRotation.value = withRepeat(
      withTiming(1, { duration: 10000 }),
      -1,
      false
    );
  }, []);

  const cloud1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cloud1X.value }],
  }));

  const cloud2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cloud2X.value }],
  }));

  const cloud3Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cloud3X.value }],
  }));

  const sunStyle = useAnimatedStyle(() => {
    const rotation = interpolate(sunRotation.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Gradiente do céu */}
      <View style={styles.sky} />
      
      {/* Sol */}
      <Animated.View style={[styles.sun, sunStyle]}>
        <View style={styles.sunCore} />
        <View style={styles.sunRay} />
        <View style={[styles.sunRay, { transform: [{ rotate: '45deg' }] }]} />
        <View style={[styles.sunRay, { transform: [{ rotate: '90deg' }] }]} />
        <View style={[styles.sunRay, { transform: [{ rotate: '135deg' }] }]} />
        <View style={[styles.sunRay, { transform: [{ rotate: '180deg' }] }]} />
        <View style={[styles.sunRay, { transform: [{ rotate: '225deg' }] }]} />
        <View style={[styles.sunRay, { transform: [{ rotate: '270deg' }] }]} />
        <View style={[styles.sunRay, { transform: [{ rotate: '315deg' }] }]} />
      </Animated.View>

      {/* Nuvens */}
      <Animated.View style={[styles.cloud, styles.cloud1, cloud1Style]}>
        <View style={styles.cloudPart} />
        <View style={[styles.cloudPart, styles.cloudPart2]} />
        <View style={[styles.cloudPart, styles.cloudPart3]} />
      </Animated.View>

      <Animated.View style={[styles.cloud, styles.cloud2, cloud2Style]}>
        <View style={styles.cloudPart} />
        <View style={[styles.cloudPart, styles.cloudPart2]} />
        <View style={[styles.cloudPart, styles.cloudPart3]} />
      </Animated.View>

      <Animated.View style={[styles.cloud, styles.cloud3, cloud3Style]}>
        <View style={styles.cloudPart} />
        <View style={[styles.cloudPart, styles.cloudPart2]} />
        <View style={[styles.cloudPart, styles.cloudPart3]} />
      </Animated.View>

      {/* Grama */}
      <View style={styles.grass} />
      
      {/* Elementos decorativos */}
      <View style={styles.decorativeElements}>
        {/* Flores */}
        <View style={[styles.flower, styles.flower1]}>
          <View style={styles.flowerCenter} />
          <View style={styles.flowerPetals}>
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
          </View>
        </View>
        
        <View style={[styles.flower, styles.flower2]}>
          <View style={styles.flowerCenter} />
          <View style={styles.flowerPetals}>
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
          </View>
        </View>
        
        <View style={[styles.flower, styles.flower3]}>
          <View style={styles.flowerCenter} />
          <View style={styles.flowerPetals}>
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
            <View style={styles.flowerPetal} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sky: {
    flex: 1,
    backgroundColor: '#87CEEB', // Azul claro do céu
  },
  sun: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunCore: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 25,
  },
  sunRay: {
    position: 'absolute',
    width: 4,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  cloud: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud1: {
    top: 80,
    left: -100,
  },
  cloud2: {
    top: 120,
    left: -100,
  },
  cloud3: {
    top: 160,
    left: -100,
  },
  cloudPart: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  cloudPart2: {
    width: 50,
    height: 50,
  },
  cloudPart3: {
    width: 35,
    height: 35,
  },
  grass: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#90EE90', // Verde claro
  },
  decorativeElements: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flower: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flower1: {
    left: 50,
  },
  flower2: {
    left: width / 2 - 20,
  },
  flower3: {
    right: 50,
  },
  flowerCenter: {
    width: 12,
    height: 12,
    backgroundColor: '#FFD700',
    borderRadius: 6,
    zIndex: 2,
  },
  flowerPetals: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  flowerPetal: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#FF69B4',
    borderRadius: 7.5,
    top: 7.5,
    left: 7.5,
  },
}); 