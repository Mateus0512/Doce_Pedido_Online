import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    pendingContainer:{
        backgroundColor:theme.colors.white,
        padding:10,
        borderTopWidth:1,
        borderColor: "#ccc"
    },
    title:{
        color: theme.colors.slate_950,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: theme.fonts.family.bold,
    }
});
