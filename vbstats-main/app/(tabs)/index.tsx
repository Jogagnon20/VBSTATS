import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VBSTATS = () => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [timeOutA, setTimeOutA] = useState(0);
  const [timeOutB, setTimeOutB] = useState(0);
  const [changementA, setChangementA] = useState(0);
  const [changementB, setChangementB] = useState(0);
  const [mancheA, setMancheA] = useState(0);
  const [mancheB, setMancheB] = useState(0);

  //handler pour les action des joueurs
  const handlePlayerAction = (player: string, action: string) => {
    Alert.alert('Action', `${player} - ${action}`);
  };

  //handler pour les changements
  const handleSwitch = () => {
    Alert.alert('Switch', 'Changement d\'équipes effectué');
  };

  //handler pour les time outs
  const handleTimeOut = () => {
    Alert.alert('Time Out', 'Time Out demandé');
  };

  const handlePasse = (section: string) => {
    Alert.alert('Passe', `Passe effectuée - ${section}`);
  };

  //handler pour les points
  const handlePointA = () => {
    if(scoreA < 25){
      setScoreA(scoreA + 1);
    } else {
      Alert.alert('Info', 'Set terminé');
      handleManche();
    }
  };

  const handlePointB = () => {
    if(scoreB < 25){
      setScoreB(scoreB + 1);
    } else {
      Alert.alert('Info', 'Set terminé');
      handleManche();
    }
  };

  const handleManche = () => {
    if(scoreA === 25){
      setMancheA(mancheA + 1);
    } else if(scoreB === 25){
      setMancheB(mancheB + 1);
    }
    setScoreA(0);
    setScoreB(0);
  }

  interface PlayerGroupProps {
    rotationNumber?: string;
    playerNumber: string;
    playerName: string;
  }

  const PlayerGroup = ({ playerNumber, playerName }: PlayerGroupProps) => (
    <View style={styles.playerGroup}>
      <Text style={styles.playerNumber}>{playerNumber} | {playerName}</Text>
      <View style={styles.playerControls}>
        <TouchableOpacity 
          style={styles.playerBtn}
          onPress={() => handlePlayerAction(playerNumber, 'Service')}
        >
          <Text style={styles.playerBtnText}>Service</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.playerBtn}
          onPress={() => handlePlayerAction(playerNumber, 'Attaque')}
        >
          <Text style={styles.playerBtnText}>Attaque</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.playerBtn}
          onPress={() => handlePlayerAction(playerNumber, 'Bloc')}
        >
          <Text style={styles.playerBtnText}>Bloc</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.playerBtn}
          onPress={() => handlePlayerAction(playerNumber, 'Dig')}
        >
          <Text style={styles.playerBtnText}>Dig</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtons}>
        {/* <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => handlePlayerAction(playerNumber, 'Erreur Filet')}
        >
          <Text style={styles.actionBtnText}>Erreur Filet</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => handlePlayerAction(playerNumber, 'Erreur')}
        >
          <Text style={styles.actionBtnText}>Erreur</Text>
        </TouchableOpacity>        
        <TouchableOpacity 
          style={styles.passeFrontBtn} 
          onPress={() => handlePasse('Passe')}
        >
          <Text style={styles.passeBtnText}>Passe</Text>
        </TouchableOpacity>       
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f8f9fa"
        translucent={false}
      />
      <View style={styles.mainContainer}>
        <View style={styles.leftSection}>
          {/* Section Score */}
          <View style={styles.scoreSection}>
            <Text style={styles.scoreHeader}>SCORE</Text>
            <View style={styles.scoreRow}>
              <View style={styles.teamSection}>
                <View style={styles.teamScore}>
                  <Text style={styles.teamLabel}>T.O</Text>
                  <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreText}>{timeOutA}</Text>
                  </View>
                </View>
                <View style={styles.teamScore}>
                  <Text style={styles.teamLabel}>Changement</Text>
                  <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreText}>{changementA}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.setSection}>
                <View style={styles.setScores}>
                  <View style={styles.setBox}>
                    <TouchableOpacity onPress={handleManche}>
                      <Text style={styles.setBtnText}>{mancheA}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePointA}>
                      <Text style={styles.mainScoreText}>{scoreA}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.vsText}>VS</Text>
                  <View style={styles.setBox}>
                    <TouchableOpacity onPress={handleManche}>
                      <Text style={styles.setBtnText}>{mancheB}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePointB}>
                      <Text style={styles.mainScoreText}>{scoreB}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <View style={styles.teamSection}>
                <View style={styles.teamScore}>
                  <Text style={styles.teamLabel}>T.O</Text>
                  <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreText}>{timeOutB}</Text>
                  </View>
                </View>
                <View style={styles.teamScore}>
                  <Text style={styles.teamLabel}>Changement</Text>
                  <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreText}>{changementB}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Section Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.switchBtn} onPress={handleSwitch}>
              <Text style={styles.switchBtnText}>Switch</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeoutBtn} onPress={handleTimeOut}>
              <Text style={styles.timeoutBtnText}>Time Out</Text>
            </TouchableOpacity>
          </View>

          {/* Sections des joueurs */}
          <View style={styles.playersMainSection}>
            {/* <Text style={styles.playersSectionTitle}>GESTION DES JOUEURS</Text> */}
            
            {/* Ligne Avant */}
            <View style={styles.lineSubSection}>
              <Text style={styles.playersHeader}>Ligne Avant</Text>
              <View style={styles.playersContainer}>
                <View style={styles.playerRow}>
                  <PlayerGroup rotationNumber="4" playerNumber="Numéro" playerName="Joueur" />
                  <PlayerGroup rotationNumber="3" playerNumber="Numéro" playerName="Joueur" />
                  <PlayerGroup rotationNumber="2" playerNumber="Numéro" playerName="Joueur" />
                </View>
              </View>
            </View>

            {/* Ligne Arrière */}
            <View style={styles.lineSubSection}>
              <Text style={styles.playersHeader}>Ligne Arrière</Text>
              <View style={styles.playersContainer}>
                <View style={styles.playerRow}>
                  <PlayerGroup rotationNumber="5" playerNumber="Numéro" playerName="Joueur" />
                  <PlayerGroup rotationNumber="6" playerNumber="Numéro" playerName="Joueur" />
                  <PlayerGroup rotationNumber="1" playerNumber="Numéro" playerName="Joueur" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Section Filet */}
        {/* <View style={styles.filetSection}> */}
          {/*<Text style={styles.filetTitle}>Terrain de Volleyball</Text>*/}
          <View style={styles.courtVisual}>
            {/* Ligne centrale (filet) */}
            <View style={styles.courtNet} />
            
            {/* Lignes d'attaque */}
            <View style={[styles.attackLine, { top: '30%' }]} />
            <View style={[styles.attackLine, { bottom: '30%' }]} />
            
            {/* Équipe du haut (A) */}
            <View style={[styles.courtHalf, styles.courtTop]}>
              <Text style={styles.courtLabel}>ÉQUIPE B</Text>
              <View style={styles.courtPositions}>
                {/* Ligne arrière (en haut pour l'équipe B) */}
                <View style={styles.courtRow}>
                  <View style={[styles.position, styles.positionBack]}>
                    <Text style={styles.posText}>1</Text>
                  </View>
                  <View style={[styles.position, styles.positionBack]}>
                    <Text style={styles.posText}>6</Text>
                  </View>
                  <View style={[styles.position, styles.positionBack]}>
                    <Text style={styles.posText}>5</Text>
                  </View>
                </View>
                {/* Ligne avant (près du filet pour l'équipe B) */}
                <View style={styles.courtRow}>
                  <View style={styles.position}>
                    <Text style={styles.posText}>2</Text>
                  </View>
                  <View style={styles.position}>
                    <Text style={styles.posText}>3</Text>
                  </View>
                  <View style={styles.position}>
                    <Text style={styles.posText}>4</Text>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Équipe du bas (A) */}
            <View style={[styles.courtHalf, styles.courtBottom]}>
              <View style={styles.courtPositions}>
                {/* Ligne avant (près du filet pour l'équipe A) */}
                <View style={styles.courtRow}>
                  <View style={styles.position}>
                    <Text style={styles.posText}>4</Text>
                  </View>
                  <View style={styles.position}>
                    <Text style={styles.posText}>3</Text>
                  </View>
                  <View style={styles.position}>
                    <Text style={styles.posText}>2</Text>
                  </View>
                </View>
                {/* Ligne arrière (en bas pour l'équipe A) */}
                <View style={styles.courtRow}>
                  <View style={[styles.position, styles.positionBack]}>
                    <Text style={styles.posText}>5</Text>
                  </View>
                  <View style={[styles.position, styles.positionBack]}>
                    <Text style={styles.posText}>6</Text>
                  </View>
                  <View style={[styles.position, styles.positionBack]}>
                    <Text style={styles.posText}>1</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.courtLabel}>ÉQUIPE A</Text>
            </View>
          </View>
        </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  leftSection: {
    flex: 1.6,
    marginRight: 8,
  },
  
  // Section Score
  scoreSection: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e3a8a',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamSection: {
    flex: 1,
  },
  setSection: {
    flex: 1.5,
    alignItems: 'center',
  },
  teamScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  teamLabel: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#374151',
  },
  scoreDisplay: {
    backgroundColor: '#e0e7ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 35,
    alignItems: 'center',
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  setScores: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  setBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#3b82f6',
    padding: 6,
    alignItems: 'center',
    minWidth: 40,
    borderRadius: 4,
  },
  setBtnText: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    fontSize: 12,
  },
  mainScoreText: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    fontSize: 18,
    marginTop: 2,
  },
  vsText: {
    fontWeight: 'bold',
    color: '#6b7280',
    fontSize: 12,
  },

  // Section Controls
  controlsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  switchBtn: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  switchBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeoutBtn: {
    flex: 1,
    backgroundColor: '#f59e0b',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  timeoutBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Section Joueurs
  playersMainSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  playersSectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#5b21b6',
    marginBottom: 6,
  },
  lineSubSection: {
    marginBottom: 6,
  },
  playersHeader: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#ede9fe',
    color: '#5b21b6',
    padding: 4,
    borderRadius: 4,
    marginBottom: 6,
  },
  playersContainer: {
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#c4b5fd',
    borderRadius: 6,
    padding: 6,
  },
  playerRow: {
    flexDirection: 'row',
    gap: 20,
  },
  playerGroup: {
    alignItems: 'center',
    flex: 1,
  },
  playerNumber: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 11,
    color: '#1f2937',
  },
  playerControls: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 5,
    width: '100%',
  },
  playerBtn: {
    backgroundColor: '#3b82f6',
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 28,
  },
  playerBtnText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 4,
    width: '100%',
  },
  actionBtn: {
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#dc2626',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 28,
  },
  actionBtnText: {
    fontSize: 8,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passeFrontBtn: {
    backgroundColor: '#06b6d4',
    borderWidth: 1,
    borderColor: '#0891b2',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 28,
  },
  passeBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 9,
    textAlign: 'center',
  },

  // Section Filet/Terrain - Optimisée
  filetSection: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#f59e0b',
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  filetTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#d97706',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  courtVisual: {
    flex: 1,
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#f59e0b',
    position: 'relative',
    overflow: 'hidden',
  },
  courtNet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 6,
    backgroundColor: '#ffffff',
    marginTop: -3,
    zIndex: 3,
    elevation: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  attackLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#ffffff',
    opacity: 0.6,
    zIndex: 1,
  },
  courtHalf: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  courtTop: {
    borderBottomWidth: 0,
  },
  courtBottom: {
    borderTopWidth: 0,
  },
  courtLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 12,
    backgroundColor: '#f59e0b',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#d97706',
    elevation: 2,
  },
  courtPositions: {
    flex: 1,
    justifyContent: 'center',
  },
  courtRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  position: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1e40af',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  positionBack: {
    backgroundColor: '#dc2626',
    borderColor: '#b91c1c',
  },
  posText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default VBSTATS;