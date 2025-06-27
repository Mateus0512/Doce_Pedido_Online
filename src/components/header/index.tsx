import { Pressable, Text, View, ViewProps } from "react-native";
import { style } from "./styles";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { MenuPopup } from "@/components/menu_popup";

type HeaderProps = ViewProps & {
    hasBackButton?: boolean,
    title: string,
    hasMenuPopup?: boolean
    itens?: string[],
    functions?: (()=> void)[],
    divisor?: number[]
}

export function Header({hasBackButton,title,hasMenuPopup,itens,functions,divisor,...rest}:HeaderProps){
    return(
        <View style={style.container} {...rest}>
            {hasBackButton ? 
            <Pressable style={style.backButton} onPress={()=> router.back()}>
                <MaterialCommunityIcons name='arrow-left' color="#fff" size={24}/>
            </Pressable>  
            : <Text></Text>}
            <Text style={style.title}>{title}</Text>
            {(hasMenuPopup && itens && functions)? <MenuPopup icon={<MaterialCommunityIcons name="dots-vertical" size={24} color="#fff"  />} functions={functions} itens={itens} divisor={divisor} /> : <Text></Text>}
        </View>
    )
}