import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        padding: 16, 
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.slate_900,
        marginBottom: 4,
        fontFamily: theme.fonts.family.bold,
    },
    phone: {
        fontSize: 16,
        color: theme.colors.slate_600,
        fontFamily: theme.fonts.family.regular,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderRadius: 5,
        backgroundColor: theme.colors.gray_200,
    },
    divisor: {
        height: 1,
        width: "100%",
        backgroundColor: "#D1D5DB",
        marginVertical: 8,
    },
    options: {
        flexDirection: "column",

        paddingVertical: 10,
        
        borderRadius: 8,
        gap: 10,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.primary,
        borderRadius: 6,
        flexDirection:"row",
        gap:10,


    },
    buttonText: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 4, // Espaço entre ícone e texto
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    animatedContainer: {
        overflow: "hidden",
    },
    address: {
        fontSize: 14,
        color: theme.colors.slate_500,
        fontFamily: theme.fonts.family.regular,
        marginTop: 4,
        lineHeight: 18, // Dá mais espaçamento entre as linhas do endereço
        
    },
    notes:{
        fontSize: 12,
        fontWeight: "bold",
        color: theme.colors.slate_900,
        marginBottom: 4,
        fontFamily: theme.fonts.family.bold,
    }
});


