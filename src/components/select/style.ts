import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        position:"relative"
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 8,
        padding: 10,
        borderColor: theme.colors.slate_400,
        backgroundColor: theme.colors.white,
        fontFamily: theme.fonts.family.regular
    },
    input_selected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    text_area: {
        width: "100%",
        height: 90,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 8,
        padding: 10,
        borderColor: theme.colors.slate_400,
        backgroundColor: theme.colors.white,
        fontFamily: theme.fonts.family.regular
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.slate_700,
        marginBottom: 4,
        fontFamily: theme.fonts.family.regular
    },
    password_icon:{
        position:"absolute",
        right:20,
        top:40,
        zIndex:50
    }
})
    
    