import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        paddingHorizontal:14,
        flexDirection: "row",
        justifyContent:"space-between",
        
        paddingVertical:20,
        backgroundColor: theme.colors.slate_200
    },
    button:{
        backgroundColor:theme.colors.slate_950,
        padding:12,
        borderRadius:12,
        borderWidth:1,
        elevation:2,
        borderColor:"#fff"
    },
    buttonDisable:{
        backgroundColor:theme.colors.slate_400,
    },
    buttonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.family.bold,
        fontSize: 16,
  },
});