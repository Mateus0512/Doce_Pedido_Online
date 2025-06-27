import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    form: {
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 14,
        paddingTop: 24,
        backgroundColor: theme.colors.slate_200,
    },
});