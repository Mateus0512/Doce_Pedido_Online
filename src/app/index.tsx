import { theme } from "@/theme";
import { ActivityIndicator, View } from "react-native";

export default function Index(){
    return(
        <View style={{flex:1, backgroundColor: theme.colors.slate_200, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator color={theme.colors.slate_900} size={32}/>
        </View>
    )
}