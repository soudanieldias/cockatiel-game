import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSound } from '../hooks/useSound';

export const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound();

  const handleToggle = async () => {
    await toggleSound();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.icon}>
          {soundEnabled ? '🔊' : '🔇'}
        </Text>
        <Text style={styles.label}>
          {soundEnabled ? 'Som ON' : 'Som OFF'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
}); 