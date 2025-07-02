import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor: "#fff",
        flexDirection:"row",
        justifyContent: "space-around",
        paddingVertical:10,
        borderWidth:1,
        borderColor: theme.colors.slate_100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itens:{
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.slate_700,
        marginBottom: 4,
        fontFamily: theme.fonts.family.regular
    },
    divisor:{
        borderWidth:1,
        borderColor:"#AAA",
        height:"100%"
    }
});