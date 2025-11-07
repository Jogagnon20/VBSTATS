// Utilisation de la librairie UI tailwindcss pour le style
import { router } from 'expo-router';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import "../../global.css";

export default function HomeScreen() {
    const backgroundImage = "../../assets/images/HomeScreenBackground.png"; // Image générée par IA
    return(
        <ImageBackground source={require(backgroundImage)} className='flex-1 justify-center items-center'>
            <Text className='text-5xl font-extrabold text-gray-900 mb-8'>
                VBSTATS
            </Text>
            <TouchableOpacity className="bg-blue-600 px-8 py-4 rounded-lg shadow-md active:bg-blue-700" onPress={() => router.push('/(tabs)/menu')}>
                <Text className="text-white text-lg font-semibold">Démarrer</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
    
}