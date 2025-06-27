import { Pressable, Text, View } from "react-native";
import { style } from "./style";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";
import { router } from "expo-router";

export function Menu(){
    return(
        <View style={style.container}>
            <Pressable style={style.itens} onPress={() => router.navigate("/home")}>
                <MaterialCommunityIcons name="home" size={24} color={theme.colors.slate_900} />
                <Text style={style.label}>Home</Text>
            </Pressable>
            <View style={style.divisor} />
            <Pressable style={style.itens} onPress={()=> router.navigate("/schedule")}>
                <MaterialCommunityIcons name="calendar-month" size={24} color={theme.colors.slate_900} />
                <Text style={style.label}>Agenda</Text>
            </Pressable>
        </View>
    )
}