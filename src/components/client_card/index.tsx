import { View, Text, Pressable, Animated, Easing, TouchableOpacity, Linking, Alert } from "react-native";
import { style } from "./styles";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";
import { useState, useRef } from "react";
import { router } from "expo-router";
import { useClients } from "@/lib/useClients";
import { ClientProps } from "@/types/clients";
import { saveToStorage } from "@/storage/storageMethods";

type ClientCardProps = ClientProps & {
    loadClients: () => void
}

export function ClientCard({ id, name, phone, street, house_number, neighborhood, city, notes, loadClients }: ClientCardProps) {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const supabaseClient = useClients();

    function toggleOptions() {
        if (!optionsOpen && contentHeight === 0) return; // Aguarda a altura ser capturada

        setOptionsOpen((prev) => !prev);
        
        Animated.timing(animatedHeight, {
            toValue: optionsOpen ? 0 : contentHeight,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }

    function formatAddress(street?: string, house_number?: string, neighborhood?: string, city?: string) {
        const addressParts = [];

        if (street) addressParts.push(`Rua: ${street}`);
        if (house_number) addressParts.push(`Número: ${house_number}`);
        if (neighborhood) addressParts.push(`Bairro: ${neighborhood}`);
        if (city) addressParts.push(`Cidade: ${city}`);

        return addressParts.length > 0 ? addressParts.join("\n") : "Endereço não informado";
    }

    function talkInWhatsApp() {
        Linking.openURL(`http://api.whatsapp.com/send?phone=+55${phone}&text=`);
    }

    async function deleteClient(id: string) {
        let response = await supabaseClient.deleteClient(id);
        if (response && response.success) {
            Alert.alert("Registro deletado");
            loadClients();
        }else{
            const result = await saveToStorage<{id:string,name:string}>("@delete_client_pending",[{id,name}]);
            if(result){
                Alert.alert("Aviso","Houve um erro ao excluir o cliente, o fará isso em instantes automaticamente.");
                router.replace("/home");
            }
            
        }
    }

    function ConfirmDeletion(id: string) {
        Alert.alert("Aviso", "Deseja excluir o cliente?", [
            { text: "Cancelar", onPress: () => {} },
            { text: "Confirmar", style: "destructive", onPress: () => deleteClient(id) },
        ]);
    }

    return (
        <View style={style.card}>
            <View style={style.cardHeader}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={style.name}>{name}</Text>
                    <Text style={style.phone}>{phone}</Text>
                    <Text style={style.address}>{formatAddress(street, house_number, neighborhood, city)}</Text>
                    {notes && <Text style={style.notes}>Nota: {notes}</Text>}
                </View>
                <Pressable style={style.icon} onPress={toggleOptions}>
                    <MaterialCommunityIcons name={optionsOpen ? "chevron-up" : "chevron-down"} size={18} color={theme.colors.primary_dark} />
                </Pressable>
            </View>

            {/* Medir altura do conteúdo antes de animar */}
            <View
                style={{ position: "absolute", opacity: 0 }}
                onLayout={(event) => {
                    if (contentHeight === 0) {
                        setContentHeight(event.nativeEvent.layout.height);
                    }
                }}
            >
                <View style={style.divisor} />
                <View style={style.options}>
                    <TouchableOpacity activeOpacity={0.7} style={style.button} onPress={talkInWhatsApp}>
                        <Text style={style.buttonText}>Enviar mensagem</Text>
                        <MaterialCommunityIcons name="whatsapp" size={16} color={theme.colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={style.button}
                        onPress={() => router.push({ pathname: "/clients/update", params: { id, name, phone, house_number, street, neighborhood, city, notes } })}
                    >
                        <Text style={style.buttonText}>Editar cliente</Text>
                        <MaterialCommunityIcons name="note-edit-outline" size={16} color={theme.colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[style.button, { backgroundColor: theme.colors.red_500 }]} onPress={() => ConfirmDeletion(id|| "")}>
                        <Text style={style.buttonText}>Excluir cliente</Text>
                        <MaterialCommunityIcons name="trash-can-outline" size={16} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Container Animado */}
            <Animated.View style={[style.animatedContainer, { height: animatedHeight }]}>
                {optionsOpen && (
                    <View>
                        <View style={style.divisor} />
                        <View style={style.options}>
                            <TouchableOpacity activeOpacity={0.7} style={style.button} onPress={talkInWhatsApp}>
                                <Text style={style.buttonText}>Enviar mensagem</Text>
                                <MaterialCommunityIcons name="whatsapp" size={16} color={theme.colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={style.button}
                                onPress={() => router.push({ pathname: "/clients/update", params: { id, name, phone, house_number, street, neighborhood, city, notes } })}
                            >
                                <Text style={style.buttonText}>Editar cliente</Text>
                                <MaterialCommunityIcons name="note-edit-outline" size={16} color={theme.colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[style.button, { backgroundColor: theme.colors.red_500 }]} onPress={() => ConfirmDeletion(id || "")}>
                                <Text style={style.buttonText}>Excluir cliente</Text>
                                <MaterialCommunityIcons name="trash-can-outline" size={16} color={theme.colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Animated.View>
        </View>
    );
}
