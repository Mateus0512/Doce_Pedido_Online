import { TextInput, TextInputProps, View } from "react-native";
import { style } from "./styles";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";

type InputSearchProps = TextInputProps & {
    selected: boolean
}

export function InputSearch({selected,...rest}:InputSearchProps){
    return(
        <View style={style.container}>
            <TextInput style={[style.input, selected && style.input_selected  ]} {...rest} placeholderTextColor="#AAA"/>
            <MaterialCommunityIcons name="account-search" size={24} color="#AAA" style={style.icon}/>
        </View>
    )
}