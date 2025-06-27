import {View, ViewProps } from "react-native";
import { style } from "./style";



export function Body({...rest}:ViewProps){
    return(

            <View style={style.container} {...rest} />

    )
}