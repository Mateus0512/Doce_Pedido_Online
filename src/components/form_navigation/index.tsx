import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, View,Text} from "react-native";
import { style } from "./style";

type FormNavigationProps = {
    prevPage: () => void,
    nextPage: () => void,
    prevButtonIsDisabled: boolean,
    nextButtonIsDisabled: boolean,
    lastPage: boolean,
    handleSubmit: () => void
}

export function FormNavigation({prevPage,nextPage,prevButtonIsDisabled,nextButtonIsDisabled,lastPage, handleSubmit}:FormNavigationProps){
    return(
       <View >
            <View style={style.container}>
                <TouchableOpacity style={[style.button,prevButtonIsDisabled && style.buttonDisable]} activeOpacity={.6} onPress={prevPage} disabled={prevButtonIsDisabled} >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff"/>
                </TouchableOpacity>

                {lastPage 
                ? 
                    <TouchableOpacity style={style.button} onPress={handleSubmit}>
                        <Text style={style.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={[style.button,nextButtonIsDisabled && style.buttonDisable]} activeOpacity={.6} onPress={nextPage} disabled={nextButtonIsDisabled}>
                        <MaterialCommunityIcons name="arrow-right" size={24} color="#fff"/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}