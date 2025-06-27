import { forwardRef } from "react";
import { View, Text, TextInput, TextInputProps, Pressable } from "react-native";
import { style } from "./styles";
import { Controller, Control } from "react-hook-form";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";

type InputProps = TextInputProps & {
    text: string;
    name: string;
    control: Control<any>;
    error?: string;
    selected: boolean;
    textarea?: boolean;
    isPasswordInput?: boolean;
    hidePassword?: boolean;
    setHidePassword?: React.Dispatch<React.SetStateAction<boolean>>
};

// Encaminha a ref para o TextInput interno
export const Input = forwardRef<TextInput, InputProps>(
    ({ text, name, control, error, selected, textarea, isPasswordInput,hidePassword,setHidePassword,...props }, ref) => {
        return (
            <View style={style.container}>
                <Text style={style.label}>{text}</Text>
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <TextInput
                            ref={ref}
                            {...props}
                            value={field.value !== undefined ? String(field.value) : ""}
                            onChangeText={field.onChange}
                            style={
                                !textarea
                                    ? [style.input, selected && style.input_selected]
                                    : [style.text_area, selected && style.input_selected]
                            }
                            placeholderTextColor="#AAA"
                        />
                         
                    )}
                />
                {(isPasswordInput&& setHidePassword) &&(
                    <Pressable style={style.password_icon} onPress={() => setHidePassword(!hidePassword)}>
                        <MaterialCommunityIcons name={hidePassword ? "eye-off-outline" : "eye-outline"} size={24} color="#AAA" />
                    </Pressable>
                )}
                {error && (
                    <Text style={[style.label, { color: "red", fontSize: 13 }]}>{error}</Text>
                )}

            </View>
        );
    }
);
