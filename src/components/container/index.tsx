import { View,ViewProps } from "react-native";
import { style } from "./styles";


export function Container({...rest}:ViewProps){
    return(
        <View {...rest} style={style.container} />
    )
}