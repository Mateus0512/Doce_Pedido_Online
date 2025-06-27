import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { style } from "./styles";

type ButtonProps = TouchableOpacityProps & {
    title:string
}

export function Button({title, ...rest}:ButtonProps){
    return(
        <TouchableOpacity style={style.container} activeOpacity={0.7} {...rest}>
            <Text style={style.title}>{title}</Text>
        </TouchableOpacity>
    )
}