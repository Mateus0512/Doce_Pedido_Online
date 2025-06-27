import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
    text: {
        color: theme.colors.primary,              // Texto escuro
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: theme.fonts.family.bold,
        backgroundColor: theme.colors.gray_100,   // Fundo claro
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginVertical: 8,
        borderRadius: 8,
        textAlign: "center",
        elevation: 2,
    }

});
