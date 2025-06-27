import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        backgroundColor:theme.colors.white,
        borderRadius:20,
        flex:1,
    },
    productItem:{
        padding: 12,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 8,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    text:{
        color: theme.colors.black,
        fontSize: 16,
        fontFamily: theme.fonts.family.regular,
    },
    productItemSelected:{
        backgroundColor: theme.colors.slate_600,
        
    },
    title:{
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: theme.fonts.family.bold,
        marginBottom:10
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
        fontFamily: theme.fonts.family.regular,
        position:"absolute",
        bottom:0
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
    containerInput:{
        height:60,
        paddingHorizontal:10
        
    }
});