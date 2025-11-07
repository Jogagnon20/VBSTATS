import { Team } from '@/data/entities/team';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function MyTeams({pressed,setPressed}:{pressed:Boolean[],setPressed:(pressed:Boolean[])=>void}) {
    const [teamName, setTeamName] = useState('');
    const [teamSeason, setTeamSeason] = useState('');
    const [Teams, setTeams] = useState<Team[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setTeams([{teamId:1,name:"Equipe 1",season:"2023",ownerId:null},
                  {teamId:2,name:"Equipe 2",season:"2024",ownerId:null},
                  {teamId:3,name:"Equipe 3",season:"2024",ownerId:null}]);
        setPressed(new Array(3).fill(false));
    },[]);
    return (
        <View style={styles.leftcontainer}>
            <View style={[styles.flexCenter,{justifyContent:'space-between'}]}>
                <Text style={styles.h2}>Mes Equipes</Text>
                  <TouchableOpacity  style={{alignItems:'center'}}
                        onPress={()=>{setModalVisible(!modalVisible)}}
                    >
                        <View style={[styles.flexCenter,styles.btn]}>
                            <MaterialCommunityIcons name="plus-circle-outline" size={25} color="white"/>
                            <Text style={[styles.h2,{color:'white'}]}>Creer une equipe</Text>
                        </View>
                </TouchableOpacity>
            </View>
                <ScrollView style={{width:'100%'}}>
                
                    {Teams.map((team)=>{
                    return(<Pressable key={team.teamId}  style={[styles.teamRecord, pressed[team.teamId-1]?styles.teamRecordePressed: styles.teamRecord]}
                                onPress={()=>{setPressed(pressed.map((p,index)=>{
                                    if(index===team.teamId-1){return !p}else{return false}
                                }))}}
                            >
                                <View style={{display:'flex',flexDirection:'column'}}>
                                    <Text style={[styles.h2, pressed[team.teamId-1]?{color:'white'}:{}]}>{team.name}</Text>
                                    <Text style={[styles.text, pressed[team.teamId-1]?{color:'white'}:{}]}>saison: {team.season}</Text>
                                </View>
                                <View style={{display:'flex',flexDirection:'row',marginLeft:'auto'}}>
                                    <MaterialCommunityIcons name="file-edit-outline" size={25} color={pressed[team.teamId-1]?"white":"#8f8f8fff"}/>
                                    <MaterialCommunityIcons name="delete-outline" size={25} color={pressed[team.teamId-1]?"white":"#8f8f8fff"}/>
                                </View>
                            </Pressable>
                    )})}
        

                    <Modal
                        animationType="fade"
                        visible={modalVisible}
                        presentationStyle='formSheet'
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={[styles.flexCenter,{width:'100%', height:'100%',justifyContent:'center' ,backgroundColor:'rgba(0,0,0,0.5)'}]}>
                            <View style={styles.form}>
                                <Text>Nouvelle equipe</Text>
                                    <TextInput style={styles.input}
                                        placeholder="Nom de l'equipe"
                                        value={teamName}
                                        onChangeText={setTeamName}
                                    />
                                    <TextInput style={styles.input}
                                        placeholder='Saison'
                                        value={teamSeason}
                                        onChangeText={setTeamSeason}
                                    />
                                <TouchableOpacity  style={{width:'100%',alignItems:'center',margin:10}}
                                    onPress={(()=>{setModalVisible(!modalVisible)
                                        setTeams([...Teams,{teamId:Teams.length+1,name:teamName,season:teamSeason,ownerId:null}])
                                        setPressed([...pressed,false])
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
            </ScrollView>
        </View>
        
         
    )
}

const styles= StyleSheet.create({
     leftcontainer:{
        width:'35%',
        padding:10,
        borderColor:'#d1d1d16c',
        borderWidth:1,
        borderRadius:8,
        backgroundColor:'white',
        boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
    },
    rightContainer:{
        width:'65%',
        padding:10,
        borderColor:'#d1d1d16c',
        borderWidth:1,
        borderRadius:8,
        backgroundColor:'white',
        boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
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
        gap:10,
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