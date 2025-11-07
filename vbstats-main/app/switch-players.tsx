import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export interface Player {
  id: string;
  number: string;
  name: string;
  position: number; // 1-6
}

export default function SwitchPlayersPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Initialiser les joueurs (vous pouvez passer les joueurs via les params de navigation)
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', number: '4', name: 'Joueur 4', position: 4 },
    { id: '2', number: '3', name: 'Joueur 3', position: 3 },
    { id: '3', number: '2', name: 'Joueur 2', position: 2 },
    { id: '4', number: '5', name: 'Joueur 5', position: 5 },
    { id: '5', number: '6', name: 'Joueur 6', position: 6 },
    { id: '6', number: '1', name: 'Joueur 1', position: 1 },
  ]);
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);

  const handleDragStart = (player: Player) => {
    setDraggedPlayer(player);
  };

  const handleDrop = (targetPlayer: Player) => {
    if (!draggedPlayer || draggedPlayer.id === targetPlayer.id) {
      setDraggedPlayer(null);
      return;
    }

    // Échanger les positions
    const newPlayers = [...players];
    const draggedIndex = newPlayers.findIndex((p) => p.id === draggedPlayer.id);
    const targetIndex = newPlayers.findIndex((p) => p.id === targetPlayer.id);

    // Échanger les positions
    const tempPosition = newPlayers[draggedIndex].position;
    newPlayers[draggedIndex] = {
      ...newPlayers[draggedIndex],
      position: newPlayers[targetIndex].position,
    };
    newPlayers[targetIndex] = {
      ...newPlayers[targetIndex],
      position: tempPosition,
    };

    // Trier par position
    newPlayers.sort((a, b) => a.position - b.position);

    setPlayers(newPlayers);
    setDraggedPlayer(null);
  };

  const handleSave = () => {
    Alert.alert('Succès', 'Les positions des joueurs ont été mises à jour', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
    // TODO: Enregistrer les joueurs dans le contexte global ou async storage
  };

  const handleCancel = () => {
    router.back();
  };

  // Séparer les joueurs en ligne avant et arrière
  const frontLinePlayers = players.filter((p) => [4, 3, 2].includes(p.position));
  const backLinePlayers = players.filter((p) => [5, 6, 1].includes(p.position));

  const DraggablePlayer: React.FC<{ player: Player }> = ({ player }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
        runOnJS(handleDragStart)(player);
      },
      onActive: (event, ctx: any) => {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY;
      },
      onEnd: () => {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      },
    });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.playerCard, animatedStyle]}>
          <TouchableOpacity
            style={[
              styles.playerCardInner,
              draggedPlayer?.id === player.id && styles.playerCardDragging,
            ]}
            onPress={() => draggedPlayer && handleDrop(player)}
            activeOpacity={0.8}
          >
            <Text style={styles.playerPosition}>{player.position}</Text>
            <Text style={styles.playerNumber}>{player.number}</Text>
            <Text style={styles.playerName}>{player.name}</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>🔄 Changement de Joueurs</Text>
          <Text style={styles.subtitle}>
            Glissez-déposez ou appuyez pour échanger les positions
          </Text>
        </View>

        <ScrollView style={styles.content}>
          {/* Ligne Avant */}
          <View style={styles.lineSection}>
            <Text style={styles.lineSectionTitle}>⚡ Ligne Avant</Text>
            <View style={styles.playersRow}>
              {frontLinePlayers.map((player) => (
                <DraggablePlayer key={player.id} player={player} />
              ))}
            </View>
          </View>

          {/* Ligne Arrière */}
          <View style={styles.lineSection}>
            <Text style={styles.lineSectionTitle}>🛡️ Ligne Arrière</Text>
            <View style={styles.playersRow}>
              {backLinePlayers.map((player) => (
                <DraggablePlayer key={player.id} player={player} />
              ))}
            </View>
          </View>

          {draggedPlayer && (
            <View style={styles.dragIndicator}>
              <Text style={styles.dragIndicatorText}>
                🎯 Joueur sélectionné : {draggedPlayer.number} - {draggedPlayer.name}
              </Text>
              <Text style={styles.dragIndicatorSubtext}>
                Appuyez sur un autre joueur pour échanger
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>❌ Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.saveButtonText}>✅ Valider</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  lineSection: {
    marginBottom: 30,
  },
  lineSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#e0e7ff',
    paddingVertical: 8,
    borderRadius: 8,
  },
  playersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 10,
  },
  playerCard: {
    width: (width - 80) / 3,
    marginBottom: 10,
  },
  playerCardInner: {
    backgroundColor: '#f0f4f8',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  playerCardDragging: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  playerPosition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 5,
  },
  playerNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 3,
  },
  playerName: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  dragIndicator: {
    backgroundColor: '#fef3c7',
    borderWidth: 2,
    borderColor: '#f59e0b',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  dragIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 5,
    textAlign: 'center',
  },
  dragIndicatorSubtext: {
    fontSize: 13,
    color: '#78350f',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f9fafb',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
