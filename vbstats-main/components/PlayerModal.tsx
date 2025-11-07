import { Player } from '@/data/entities/player';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function PlayerModal({playerName,playerNumber,playerPosition,players,modalVisible, setModalVisible,setPlayerName,setPlayerNumber,setPlayerPosition,setPlayers}: 
    {playerName:string,playerNumber:string,playerPosition:string, 
    players:Player[],
    modalVisible:boolean, setModalVisible:(modalVisible:boolean)=>void,
    setPlayerName:(playerName:string)=>void,
    setPlayerNumber:(playerNumber:string)=>void,
    setPlayerPosition:(playerPosition:string)=>void,
    setPlayers:(players:Player[])=>void}
    ) {
    return (
            <Modal
                presentationStyle='formSheet'
                animationType="fade"
                visible={modalVisible}
                
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={[styles.flexCenter,{width:'100%', height:'100%',justifyContent:'center' ,backgroundColor:'rgba(0,0,0,0.5)'}]}>
                    <View style={styles.form}>
                        <Text>Nouvelle equipe</Text>
                        <TextInput style={styles.input}
                            placeholder="Nom du joueur"
                            value={playerName}
                            onChangeText={setPlayerName}
                            />
                            <TextInput style={styles.input}
                                 placeholder='number'
                                value={playerNumber.toString()}
                                 onChangeText={setPlayerNumber}
                            />
                             <TextInput style={styles.input}
                                 placeholder='position'
                                value={playerPosition}
                                 onChangeText={setPlayerPosition}
                            />
                            <TouchableOpacity  style={{width:'100%',alignItems:'center',margin:10}}
                                onPress={(()=>{ 
                                    if (!playerName || !playerNumber || !playerPosition) return; // évite crash
                                            const number = parseInt(playerNumber);
                                            if (isNaN(number)) return;
                                    setPlayers([...players,{playerId:players.length+1,name:playerName,number:number,position:playerPosition}])
                                    setModalVisible(!modalVisible)
                                    })}
                             >
                                <View style={[styles.flexCenter,styles.btn]}>
                                    <MaterialCommunityIcons name="plus-circle-outline" size={25} color="white"/>
                                    <Text style={[styles.h2,{color:'white'}]}>Ajouter</Text>
                                </View>
                            </TouchableOpacity> 
                    </View>  
                                    
                </View>
                                
            </Modal>
    )
}

const styles= StyleSheet.create({
    rightContainer:{
        width:'64%',
        padding:10,
        borderColor:'#d1d1d16c',
        borderWidth:1,
        borderRadius:8,
        backgroundColor:'white',
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
        boxShadow:'0 2px 4px rgba(0,0,0,0.2)',
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