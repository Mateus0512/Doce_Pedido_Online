import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.slate_100,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.slate_900,
    },
    title: {
        color: theme.colors.white,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: theme.fonts.family.bold,
    },
    titleSection: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.slate_800,
        marginBottom: 8,
        fontFamily: theme.fonts.family.bold,
    },
    backButton: {
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 50,
        alignSelf: "flex-start",
    },
    body: {
        flex: 1,
        backgroundColor: theme.colors.slate_200,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 14,
        paddingTop: 24,
    },
    section: {
        backgroundColor: theme.colors.white,
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
    },
    sectionProducts: {
        backgroundColor: theme.colors.slate_50,
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.slate_700,
        marginBottom: 4,
        fontFamily: theme.fonts.family.regular,
    },
    productItem: {
        flexDirection: "column",
        // justifyContent: "space-between",
        // alignItems: "center",
        backgroundColor: theme.colors.slate_100,
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 1,
    },
    productName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.slate_800,
        fontFamily: theme.fonts.family.regular,
    },
    productInfo: {
        fontSize: 14,
        color: theme.colors.slate_600,
        marginLeft: 8,
        fontFamily: theme.fonts.family.regular,
    },
    saleInformation:{
        fontFamily: theme.fonts.family.regular,
        color: theme.colors.slate_600,
        fontSize: 14,
        marginLeft: 8,
    },
    buttonContainer:{
        paddingHorizontal:14,
        flexDirection: "row",
        justifyContent:"flex-end",
        
        paddingVertical:20,
        backgroundColor: theme.colors.slate_200
    },
    button:{
        backgroundColor:theme.colors.red_500,
        padding:12,
        borderRadius:12,
        borderWidth:1,
        elevation:2,
        borderColor:"#fff"
    },
    buttonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.family.bold,
        fontSize: 16,
    },
    buttonDisabled:{
        backgroundColor: theme.colors.slate_100
    },
    buttonTextDisabled: {
        color: theme.colors.black,
        fontFamily: theme.fonts.family.bold,
        fontSize: 16,
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
        fontFamily: theme.fonts.family.regular
    },
    noSaleText:{
        fontSize: 18,
        color: theme.colors.slate_900,
        marginBottom: 4,
        fontFamily: theme.fonts.family.medium,
        textAlign: "center"
    }
});
