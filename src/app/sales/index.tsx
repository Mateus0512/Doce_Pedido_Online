import { Body } from "@/components/body";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { SaleCard } from "@/components/sale_card";
import { useAuth } from "@/contexts/authContext";
import { useSales } from "@/lib/useSales";
import { SaleProps } from "@/types/sales";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {Alert, FlatList, Pressable, TouchableOpacity} from "react-native";
import { Menu } from "@/components/menu";
import { useClients } from "@/lib/useClients";
import { Dropdown } from "react-native-element-dropdown";
import { commonStyles } from "./styles";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { TotalItems } from "@/components/total_items";

export default function Sales(){
    const {user} = useAuth();
    const supabaseClients = useClients();
    const supabaseSales = useSales();

    const [sales, setSales] = useState<SaleProps[]>([]);
    const [searchedSales,setSearchedSales] = useState<SaleProps[]>([]);
    const [clients,setClients] = useState<{id:string,name:string}[]>([]);


    async function loadSales() {
        if (!user?.id) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }

        const response = await supabaseSales.fetchSales(user.id);
        if(response.success && response.data){
            setSales(response.data);
        }
    }

    async function loadClients() {
        try {
            if(!user?.id){
            Alert.alert("Erro", "Usuário não autenticado.");
            return
            }

            const result = await supabaseClients.fetchClients(user.id);

            if(result.success && result.data){
                //console.log(result)
                const newClients = result.data.map(item => (
                    {id: item.id || '', name: item.name}
                ))
                setClients(newClients);
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    async function loadSearchedClientSales(id:string) {
        try {
            const resultSearchedSales = await supabaseSales.fetchSalesFromClient(id);
            if(resultSearchedSales.success && resultSearchedSales.data) setSearchedSales(resultSearchedSales.data);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredSales = searchedSales.length>0 ? searchedSales : sales

    useEffect(() => {
        loadClients();
        loadSales();
    },[]);

    return(
        <Container>
            <Header title="Vendas" hasMenuPopup itens={["Adicionar Venda","Ajuda"]} functions={[()=> router.navigate("/sales/addSale"),() => router.navigate("/help/sales")]}/>
            <Body>
                <Dropdown 
                    data={clients}
                    valueField={"id"}
                    labelField={"name"}
                    onChange={(item) => loadSearchedClientSales(item.id)}
                    style={commonStyles.input}
                    placeholder="Selecione um cliente"
                    search
                    searchPlaceholder="Pesquise um cliente"
                    renderRightIcon={() => 
                        searchedSales.length > 0 
                        ? (
                            <TouchableOpacity onPress={() => setSearchedSales([])}>
                                <MaterialCommunityIcons name="close" size={18} />
                            </TouchableOpacity>
                        )
                        : <MaterialCommunityIcons name="chevron-down" size={18} color="#AAA" />
                    }
                    
                />

                <TotalItems filteredDataLength={filteredSales.length} screen="vendas"  />

                <FlatList 
                    data={filteredSales}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => 
                    <SaleCard  
                        sale={item}

                    />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:60}}
                />
            </Body>
            <Menu />
        </Container>
    )
}