import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: theme.colors.slate_900,
        marginBottom: 16,
        fontFamily: theme.fonts.family.bold,
      },
      paragraph: {
        fontSize: 16,
        color: theme.colors.slate_800,
        marginBottom: 12,
        lineHeight: 22,
        fontFamily: theme.fonts.family.regular,
      },
      bold: {
        fontWeight: "bold",
        color: theme.colors.slate_900,
        fontFamily: theme.fonts.family.bold,
      }
});