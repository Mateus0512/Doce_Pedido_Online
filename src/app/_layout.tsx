import { Slot } from "expo-router";
import {useFonts, Poppins_400Regular, Poppins_500Medium,Poppins_700Bold} from "@expo-google-fonts/poppins";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/contexts/authContext";
import { MenuProvider} from 'react-native-popup-menu';

export default function Layout(){
    const [fontLoaded] = useFonts({
        Poppins_400Regular,Poppins_500Medium,Poppins_700Bold
    });

    if(!fontLoaded) return null

    return (
        <AuthProvider>
            <MenuProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={["top"]}>
                    <StatusBar barStyle="light-content" backgroundColor="#0f172a" translucent />
                    <Slot/>
                </SafeAreaView>
            </MenuProvider>
        </AuthProvider>
    )
}