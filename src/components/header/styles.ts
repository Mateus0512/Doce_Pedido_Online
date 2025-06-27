import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: 40, // Ajuste para iOS (evita sobreposição com StatusBar)
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: theme.fonts.family.bold,
    },
    backButton:{
        //backgroundColor: "rgba(255, 255, 255, 0.1)", // Fundo levemente transparente
        
        //borderRadius: 50, // Deixa o botão redondo
        //padding:10
    }
});