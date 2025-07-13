import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { useSound } from '../hooks/useSound';

const { width, height } = Dimensions.get('window');

export const GameHUD: React.FC = () => {
  const {
    running,
    multiplier,
    betAmount,
    totalSeeds,
    currentSeeds,
    startGame,
    stopGame,
    whistle,
    setBetAmount,
  } = useGameStore();

  const { playWhistle } = useSound();

  const betOptions = [10, 25, 50, 100, 250, 500];

  const handleBetChange = (amount: number) => {
    if (!running) {
      setBetAmount(amount);
    }
  };

  const handleWhistle = () => {
    whistle();
    playWhistle();
  };

  return (
    <View style={styles.container}>
      {/* Informações do jogo */}
      <View style={styles.infoContainer}>
        <View style={styles.seedsContainer}>
          <Text style={styles.seedsLabel}>🌻 Sementes</Text>
          <Text style={styles.seedsValue}>{totalSeeds}</Text>
        </View>
        
        {running && (
          <View style={styles.currentSeedsContainer}>
            <Text style={styles.currentSeedsLabel}>🎯 Ganhando</Text>
            <Text style={styles.currentSeedsValue}>{currentSeeds}</Text>
          </View>
        )}
      </View>

      {/* Multiplicador */}
      {running && (
        <View style={styles.multiplierContainer}>
          <Text style={styles.multiplierLabel}>Multiplicador</Text>
          <Text style={styles.multiplierValue}>{multiplier.toFixed(2)}x</Text>
        </View>
      )}

      {/* Opções de aposta */}
      {!running && (
        <View style={styles.betContainer}>
          <Text style={styles.betLabel}>🌻 Aposta</Text>
          <View style={styles.betOptions}>
            {betOptions.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.betOption,
                  betAmount === amount && styles.betOptionSelected,
                ]}
                onPress={() => handleBetChange(amount)}
                disabled={running}
              >
                <Text
                  style={[
                    styles.betOptionText,
                    betAmount === amount && styles.betOptionTextSelected,
                  ]}
                >
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Botões de controle */}
      <View style={styles.controlsContainer}>
        {!running ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={startGame}
            disabled={betAmount > totalSeeds}
          >
            <Text style={styles.buttonText}>🦜 Começar Voo!</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.runningControls}>
            <TouchableOpacity
              style={[styles.button, styles.whistleButton]}
              onPress={handleWhistle}
            >
              <Text style={styles.buttonText}>🎵 Assobiar!</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.stopButton]}
              onPress={stopGame}
            >
              <Text style={styles.buttonText}>🛑 Parar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Aviso de sementes insuficientes */}
      {betAmount > totalSeeds && !running && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ Sementes insuficientes!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    paddingBottom: 40, // Adicionar padding extra para a barra de navegação
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  seedsContainer: {
    alignItems: 'center',
  },
  seedsLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },
  seedsValue: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  currentSeedsContainer: {
    alignItems: 'center',
  },
  currentSeedsLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },
  currentSeedsValue: {
    color: '#00FF00',
    fontSize: 24,
    fontWeight: 'bold',
  },
  multiplierContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  multiplierLabel: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  multiplierValue: {
    color: '#FF6B35',
    fontSize: 32,
    fontWeight: 'bold',
  },
  betContainer: {
    marginBottom: 15,
  },
  betLabel: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  betOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  betOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    minWidth: 60,
    alignItems: 'center',
  },
  betOptionSelected: {
    backgroundColor: '#FF6B35',
  },
  betOptionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  betOptionTextSelected: {
    color: '#FFF',
  },
  controlsContainer: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  whistleButton: {
    backgroundColor: '#FF9800',
    marginRight: 10,
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  runningControls: {
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  warningText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 