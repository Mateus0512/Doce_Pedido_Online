import { 
    ScrollView, 
    ScrollViewProps, 
    KeyboardAvoidingView, 
    Platform, 

} from "react-native";
import { style } from "./styles";
import { ReactNode } from "react";

type FormProps = ScrollViewProps & {
    children: ReactNode;
};

export function Form({ children, ...rest }: FormProps) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS sobe o teclado, Android ajusta a altura
            style={{ flex: 1 }}
            
        >

                    <ScrollView 
                        style={style.form} 
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={{ paddingBottom: 60 }}
                        keyboardShouldPersistTaps="handled" // Garante que os inputs ainda funcionem corretamente
                        {...rest}
                    >
                        {children}
                    </ScrollView>

        </KeyboardAvoidingView>
    );
}