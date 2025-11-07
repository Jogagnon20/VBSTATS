import MyTeams from '@/components/MyTeams';
import PlayerList from '@/components/PlayerList';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function GestionEquipePage() {
    const [pressed, setPressed] = useState<Boolean[]>([]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.mainContainer}>
                    <MyTeams pressed={pressed} setPressed={setPressed}></MyTeams>
                    <PlayerList></PlayerList>
            </SafeAreaView>
        </SafeAreaProvider>
    );
  }

const styles= StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#f0f4f8',
        padding:'2%',
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
        backgroundColor:'0 2px 4px rgba(4, 10, 54, 0.82)',
        borderColor:'#388879ff',
        borderWidth:2,
    },
    teamRecordeNormal:{
        backgroundColor:'#ffffff',
    }
})