import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.slate_900,
    },
    header: {
        padding: 34,
    },
    title: {
        color: theme.colors.white,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        fontFamily: theme.fonts.family.bold
    },
    slogan: {
        fontSize: 34,
        color: theme.colors.white,
        marginBottom: 34,
        fontFamily: theme.fonts.family.medium
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent:"center",
        marginTop: 16,
    },
    signupText: {
        fontSize: 14,
        color: theme.colors.slate_700,
        fontFamily: theme.fonts.family.regular,
    },
    signupLink: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: "bold",
        marginLeft: 4,
        fontFamily: theme.fonts.family.bold
    },
    backButton:{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Fundo levemente transparente
        padding: 10,
        borderRadius: 50, // Deixa o botão redondo
        width:45
    }
});
