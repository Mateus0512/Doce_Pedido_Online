import { View, Text, Pressable, Animated, Easing, TouchableOpacity, Alert } from "react-native";
import { style } from "./styles";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";
import { useState, useRef } from "react";
import { router } from "expo-router";
import { ProductProps } from "@/types/products";
import { saveToStorage } from "@/storage/storageMethods";
import { useProducts } from "@/lib/useProducts";

type ProductCardProps = ProductProps & {
    loadProducts: () => void
}

export function ProductCard({ id, name, price, loadProducts }: ProductCardProps) {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const supabaseProduct = useProducts();

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


    async function deleteProduct(id: string) {
        let response = await supabaseProduct.deleteProduct(id);
        if (response?.success) {
            loadProducts();
            Alert.alert("Registro deletado");
        }else{
            await saveToStorage<{id:string,name:string}>("@delete_product_pending",[{id,name}]);
            Alert.alert("Aviso","Houve um erro ao excluir o produto, o fará isso em instantes automaticamente.");
            router.replace("/home");
        }
    }

    function ConfirmDeletion(id: string) {
        Alert.alert("Aviso", "Deseja excluir o produto?", [
            { text: "Cancelar", onPress: () => {} },
            { text: "Confirmar", style: "destructive", onPress: () => deleteProduct(id) },
        ]);
    }

    return (
        <View style={style.card}>
            <View style={style.cardHeader}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={style.name}>{name}</Text>
                    <Text style={style.notes}>{price}R$</Text>
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
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={style.button}
                        onPress={() => router.push({ pathname: "/products/update", params: { id, name, price } })}
                    >
                        <Text style={style.buttonText}>Editar produto</Text>
                        <MaterialCommunityIcons name="note-edit-outline" size={16} color={theme.colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[style.button, { backgroundColor: theme.colors.red_500 }]} onPress={() => ConfirmDeletion(id|| "")}>
                        <Text style={style.buttonText}>Excluir produto</Text>
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
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={style.button}
                                onPress={() => router.push({ pathname: "/products/update", params: { id, name, price } })}
                            >
                                <Text style={style.buttonText}>Editar produto</Text>
                                <MaterialCommunityIcons name="note-edit-outline" size={16} color={theme.colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={[style.button, { backgroundColor: theme.colors.red_500 }]} onPress={() => ConfirmDeletion(id || "")}>
                                <Text style={style.buttonText}>Excluir produto</Text>
                                <MaterialCommunityIcons name="trash-can-outline" size={16} color={theme.colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Animated.View>
        </View>
    );
}
