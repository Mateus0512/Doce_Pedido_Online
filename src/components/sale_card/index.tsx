import { View, Text, Pressable, Animated, Easing, TouchableOpacity } from "react-native";
import { style } from "./styles";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@/theme";
import { useState, useRef } from "react";
import { router } from "expo-router";
import { SaleProps} from "@/types/sales";



export function SaleCard({sale}: {sale: SaleProps}) {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animatedHeight = useRef(new Animated.Value(0)).current;

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


    function normalizedDate(date: string) {
        return date.split("-").reverse().join("/");
    }

    return (
        <TouchableOpacity style={style.card} activeOpacity={0.6} 
        onLongPress={() => router.push({pathname: "/sales/sale", params: {id:sale.id}})}>
            <View style={style.cardHeader}>
                <View style={{flexShrink:1}}>
                    <Text style={style.name}>{sale.party_theme ?? "Venda simples"}</Text>
                    <Text style={style.subtitle}>{sale.birthday_person_name ?? sale.clients?.name ?? "Cliente desconhecido"}</Text>
                </View>
                <Pressable style={style.icon} onPress={toggleOptions}>
                    <MaterialCommunityIcons name={optionsOpen ? "chevron-up" : "chevron-down"} size={18} color={theme.colors.primary_dark} />
                </Pressable>
            </View>

            {/* Medir altura do conteúdo antes de animar */}
                <View 
                    onLayout={(event) => {
                        if (contentHeight === 0) { 
                            setContentHeight(event.nativeEvent.layout.height);
                        }
                    }}
                    style={{ position: "absolute", opacity: 0 }} // Esconde o conteúdo até capturar altura
                >
                    <View style={style.divisor} />
                        {sale.birthday_person_name && <Text style={style.details}>Cliente: {sale.clients?.name}</Text>}
                        <Text style={style.details}>Data do Pedido: {normalizedDate(sale.order_date)}</Text>
                        <Text style={style.details}>Data de Entrega: {normalizedDate(sale.delivery_date)}</Text>
                        <Text style={style.details}>Status: {sale.status_delivery ? "Entregue" : "Pendente"}</Text>
                </View>

            {/* Container Animado */}
            <Animated.View style={[style.animatedContainer, { height: animatedHeight }]}>
                {optionsOpen && (
                <View>
                    <View style={style.divisor} />
                        {sale.birthday_person_name && <Text style={style.details}>Cliente: {sale.clients?.name}</Text>}
                        <Text style={style.details}>Data do Pedido: {normalizedDate(sale.order_date)}</Text>
                        <Text style={style.details}>Data de Entrega: {normalizedDate(sale.delivery_date)}</Text>
                        <Text style={style.details}>Status: {sale.status_delivery ? "Entregue" : "Pendente"}</Text>
                </View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
}
