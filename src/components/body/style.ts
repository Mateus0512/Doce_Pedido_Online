import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.slate_200,
        flex: 1,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        padding: 20,
    },
});