import { Body } from "@/components/body";
import { Header } from "@/components/header";
import { Alert, FlatList} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { useClients } from "@/lib/useClients";
import { useEffect, useState } from "react";
import { ClientProps } from "@/types/clients";
import { ClientCard } from "@/components/client_card";
import { InputSearch } from "@/components/input_search";
import { TotalItems } from "@/components/total_items";
import { Container } from "@/components/container";
import { Menu } from "@/components/menu";

export default function Clients(){
    const {user} = useAuth();
    const supabaseClients = useClients();
    const [clients,setClients] = useState<ClientProps[]>([]);
    const [inputSearchSelected,setInputSearchSelected] = useState(false);
    const [search,setSearch] = useState("");

    async function loadClients() {
        if (!user?.id) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }
        const result = await supabaseClients.fetchClients(user.id);
        //console.log(result);
        if(result.success && result.data)setClients(result.data);
    }


    const filteredClients = search.length > 0 
    ? clients.filter((client) => client.name.toLowerCase().includes(search.toLowerCase()))
    : clients 

    useEffect(()=> {
        loadClients();
        
    },[])

    return(
        <Container>
            <Header title="Clientes" 
                hasMenuPopup 
                functions={[()=> router.navigate("/clients/add"),()=> router.navigate("/help/clients")]}
                itens={["Cadastrar cliente", "Ajuda"]}
            />
            <Body>
                <InputSearch 
                    placeholder="Procure um cliente"
                    selected={inputSearchSelected}
                    onFocus={()=> setInputSearchSelected(true)}
                    onBlur={()=> setInputSearchSelected(false)}
                    onChangeText={setSearch}
                />

                <TotalItems filteredDataLength={filteredClients.length} screen="clientes"/>
                
                <FlatList 
                    data={filteredClients}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <ClientCard id={item.id} name={item.name} phone={item.phone} city={item.city} house_number={item.house_number} neighborhood={item.neighborhood} notes={item.notes} street={item.street} loadClients={loadClients}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:60}}
                />
            </Body>
            <Menu />
        </Container>
        
    )
}