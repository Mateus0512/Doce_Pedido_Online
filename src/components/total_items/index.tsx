import {Text, TextProps} from "react-native";
import {styles} from "./styles";

type TotalItemsProps = TextProps & {
    filteredDataLength: number,
    screen: string
}

export function TotalItems({filteredDataLength,screen,...rest}:TotalItemsProps){
    return(
        <Text style={styles.text} {...rest}>Total de {screen}: {filteredDataLength}</Text>
    )
}