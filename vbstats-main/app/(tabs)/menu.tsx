// Utilisation de la librairie UI tailwindcss pour le style
import { router } from 'expo-router';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import "../../global.css";

export default function MenuScreen() {
    const backgroundImage = "../../assets/images/HomeScreenBackground.png"; // Image générée par IA
    const menuItems = [
        { title: "Match", route: 'match' },
        { title: "Gestion des équipes", route: 'teams' },
        { title: "Statistiques", route: 'stats' },
        { title: "Paramètres", route: 'settings' },
        { title: "Test", route: '../db' },
    ];
    
    return(
        <ImageBackground source={require(backgroundImage)} className='flex-1 justify-center items-center'>
            <View className='bg-white p-6 rounded-lg shadow-md size-60 border-2 border-blue-400'>
                <FlatList data={menuItems}
                    keyExtractor={(item) => item.route}
                    renderItem={({item}) => (
                       <TouchableOpacity onPress={() => {router.push(`/(tabs)/${item.route}`)}} className='bg-white'>
                           <Text className='text-black text-xl text-center'>{item.title}</Text>
                       </TouchableOpacity>
                    )}
                />
            </View>
        </ImageBackground>
    )
}