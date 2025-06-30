import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        position:"relative"
    },
    input: {
        width: "100%",
        padding: 10,
        borderColor: theme.colors.slate_400,
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: theme.colors.white,
        fontFamily: theme.fonts.family.regular,
        color: theme.colors.black
    },
    input_selected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        color: theme.colors.black
    },
    icon:{
        position:"absolute",
        right:20,
        top:20,
        zIndex:50
    }
});