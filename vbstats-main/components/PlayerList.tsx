import PlayerModal from '@/components/PlayerModal';
import { Player } from '@/data/entities/player';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlayerList() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [playerNumber, setPlayerNumber] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');

    useEffect(() => {
        setPlayers([{ playerId: 1, name: 'Player 1',number: 10, position: 'Setter' },
                    { playerId: 2, name: 'Player 2',number: 12, position: 'Libero' },
                    { playerId: 3, name: 'Player 3',number: 8, position: 'Outside Hitter' }]);
    },[]);
    return (
      <View style={styles.rightContainer}>
        <View style={[styles.flexCenter,{justifyContent:'space-between'}]}>
            <Text style={styles.h1}>Nom de l'equipe seletionee</Text>
            <View style={[styles.flexCenter]}>
               <TouchableOpacity style={[styles.btn,styles.flexCenter,{backgroundColor:'#d1d1d16c'}]}>
                    <MaterialCommunityIcons name="pencil-outline" size={20} color="black"/>
                    <Text style={[styles.text]}>Edit Team</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,styles.flexCenter]}
                    onPress={()=>{setModalVisible(!modalVisible)}}>
                    <Ionicons name="person-add-outline" size={20} color="white"/>
                    <Text style={[styles.text,{color:'white'}]}>Add Player</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{width:'100%'}}>
            <FlatList
                numColumns={3}
                data={players}
                keyExtractor={(item) => item.playerId.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.playerRecord,styles.flexCenter,{justifyContent:'space-evenly'}]}>
                        <Ionicons name="person" size={20} color="gray"/>
                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={styles.h2}>{item.name}</Text>
                            <Text style={styles.text}>#{item.number} - {item.position}</Text>
                        </View>
                        <SimpleLineIcons name="options-vertical" size={15} color="gray"/>
                    </View>
                )}
            />
        </View>
        <PlayerModal
            playerName={playerName}
            playerNumber={playerNumber}
            playerPosition={playerPosition}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setPlayerName={setPlayerName}
            setPlayerNumber={setPlayerNumber}
            setPlayerPosition={setPlayerPosition}
            players={players}
            setPlayers={setPlayers}
        ></PlayerModal>
         

      </View>  
)}


const styles= StyleSheet.create({
    rightContainer:{
        width:'64%',
        padding:10,
        borderColor:'#d1d1d16c',
        borderWidth:1,
        borderRadius:8,
        backgroundColor:'white',
        boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
        display:'flex',
        flexDirection:'column'
    },
    h1:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        fontFamily:'sans-serif',
    },
    h2:{
        fontSize:15,
        fontWeight:'bold',
        marginBottom:5,
        fontFamily:'sans-serif',
    },
    text:{
        fontSize:12,
        fontFamily:'sans-serif',
    },
    teamRecord:{
        width:'100%',
        height:100,
        marginVertical:10,
        borderRadius:8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        borderColor:'#eae6e6ff',
        borderWidth:1,
        boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
    },
    playerRecord:{
        width:'27%',
        height:100,
        margin:'3%',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#d1d1d16c',
        padding:10,
        },
    teamRecordePressed:{
        backgroundColor:'0 2px 4px rgba(26, 99, 83, 0.47)',
        borderColor:'#388879ff',
        borderWidth:2,
    },
    teamRecordeNormal:{
        backgroundColor:'#ffffff',
    },
    flexCenter:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    btn:{
        
        borderRadius:8,
        backgroundColor:'#388879ff',
        padding:10,
        margin:2
    },
    form:{
        width:300,
        height:300,
        backgroundColor:'white',
        borderRadius:8,
        padding:20,
        justifyContent:'center',
        alignItems:'center',
    },
    input:{
        height:30,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:10,
        width:'100%',
        padding:5,
    }


})