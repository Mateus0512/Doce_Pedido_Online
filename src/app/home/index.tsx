import { View,Text, Pressable, Alert, TouchableOpacity, Modal } from "react-native";
import {useAuth} from "@/contexts/authContext";
import { style } from "./styles";
import { theme } from "@/theme";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { MenuPopup } from "@/components/menu_popup";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useSchedule } from "@/lib/useSchedule";
import { SaleProps } from "@/types/sales";
import { useClients } from "@/lib/useClients";
import { Button } from "@/components/button";
import { syncAll } from "@/storage/allSyncMethods";
import { useProducts } from "@/lib/useProducts";
import { clearStorage, getFromStorage, saveToStorage } from "@/storage/storageMethods";
import { useSales } from "@/lib/useSales";
import { Menu } from "@/components/menu";




export default function Home(){
    const {user, setAuth} = useAuth();

    const supabaseClient = useClients();
    const supabaseProduct = useProducts();
    const supabaseSales = useSales();

    const [showSyncModal,setShowSyncModal] = useState(false);
    const [schedule, setSchedule] = useState<SaleProps[]>([]);
    const [pendingClientsNames,setPendingClientsNames] = useState<{name:string,operation:string}[]>([]);
    const [pendingProductsNames,setPendingProductsNames] = useState<{name:string,operation:string}[]>([]);
    const [pendingSalesNames,setPendingSalesNames] = useState<{name:string,operation:string}[]>([]);

    const scheduleSupabase = useSchedule();

    async function handleSignOut() {
        const {error} = await supabase.auth.signOut();
        if(error){
            Alert.alert("Erro", error.message);
            return
        }
        const keys = ["@clients", "@products", "@sales", "@sales_pending"];
        await Promise.all(keys.map(async key => {
            await clearStorage(key);
        }));

        setAuth(null);
        router.replace('/auth/signin');
    }

    async function loadSchedule() {
        if (!user?.id) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }
        const data = await scheduleSupabase.fetchSalesPending(user.id);
        if(data.data)
        setSchedule(data.data)
    }

    async function clearAllAsyncStorage() {
        try {
            const keys = ["@clients", "@products", "@sales", "@sales_pending"];
            const storageDate = await getFromStorage<Date>("@storageDate");

            const today = new Date().toISOString().split("T")[0];

            if (!storageDate) { 
                //console.log("!storageDate");
                await saveToStorage<Date>("@storageDate", [new Date()]);
                return;
            }

            const savedDate = new Date(storageDate[0]).toISOString().split("T")[0];

            if (savedDate !== today) {
                //console.log("Limpeza realizada. Data anterior:", savedDate);

                await Promise.all(keys.map(async key => {
                    await clearStorage(key);
                }));

                // Atualiza a data depois da limpeza
                await saveToStorage<Date>("@storageDate", [new Date()]);
            }
        } catch (error) {
            console.log("Erro ao limpar AsyncStorage: ", error);
        }
    }


    async function sendingToCloud() {
        //syncAll(supabaseClient,supabaseProduct,supabaseSales,setPendingClientsNames,setPendingProductsNames,setPendingSalesNames);
        //await clearStorage("@add_sales_pending");
        // await clearStorage("@add_products_sales_pending");
        //await clearStorage("@change_status_pending");
        // await clearStorage("@sales");
        // await clearStorage("@sales_pending");
        await syncAll(supabaseClient,supabaseProduct,supabaseSales,setPendingClientsNames,setPendingProductsNames,setPendingSalesNames);
    }

    useEffect(()=>{
        clearAllAsyncStorage();
        loadSchedule();
        sendingToCloud();
    },[]);

    const totalPendentes = schedule.length;

    const valorReceber = schedule.reduce((total, item) => {
    const restante = item.total_value - item.entry_value;
    return total + restante;
    }, 0);



    return(
        <View style={style.container}>
            {/* Cabeçalho */}
            <View style={style.header}>
                <Text style={style.title}>{user?.user_metadata.display_name}</Text>
                <View style={style.icons_container}>
                    <MenuPopup icon={<MaterialCommunityIcons name="account-circle-outline" size={24} color="#ffffff"  /> } functions={[ ()=> router.navigate("/help/home"),handleSignOut]} itens={["Ajuda","Sair"]}/>
                </View>
            </View>

            {/* Corpo da Tela */}
            <View style={style.body}>

                <View style={style.cardResumo}>
                    <View style={style.resumoItem}>
                        <Text style={style.resumoTitulo}>Pendentes</Text>
                        <Text style={style.resumoValor}>{totalPendentes}</Text>
                    </View>
                    <View style={style.resumoItem}>
                        <Text style={style.resumoTitulo}>A receber</Text>
                        <Text style={style.resumoValor}>R$ {valorReceber.toFixed(2)}</Text>
                    </View>
                </View>

                {pendingClientsNames.length>0 || pendingProductsNames.length>0 || pendingSalesNames.length>0 && (
                    <TouchableOpacity onPress={() => setShowSyncModal(true)} style={style.syncNotice}>
                        <Text style={style.syncNoticeText}>🔄 Há itens pendentes para sincronizar</Text>
                    </TouchableOpacity>
                )}


                <Modal visible={showSyncModal} animationType="slide" transparent>
                <View style={style.overlay}>
                    <View style={style.containerModal}>
                    <Text style={style.titleModal}>Sincronizações Pendentes</Text>

                    {/* Clientes */}
                    <Text style={style.categoryTitle}>Clientes</Text>
                    {pendingClientsNames.length > 0 ? (
                        pendingClientsNames.map((client, i) => (
                            <View key={i} style={{ marginBottom: 8 }}>
                                <Text style={style.itemText}>• {client.name} - {client.operation}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={style.emptyText}>Nenhum cliente pendente</Text>
                    )}

                    {/* Produtos */}
                    <Text style={style.categoryTitle}>Produtos</Text>
                    {pendingProductsNames.length > 0 ? (
                        pendingProductsNames.map((product, i) => (
                            <View key={i} style={{ marginBottom: 8 }}>
                                <Text style={style.itemText}>• {product.name} - {product.operation}</Text>
  
                            </View>
                        ))
                        ) : (
                        <Text style={style.emptyText}>Nenhum produto pendente</Text>
                    )}

                    {/* Vendas */}
                    <Text style={style.categoryTitle}>Vendas</Text>
                    {pendingSalesNames.length > 0 ? (
                        pendingSalesNames.map((v, i) => <Text key={i} style={style.itemText}>• {v.name}</Text>)
                    ) : (
                        <Text style={style.emptyText}>Nenhuma venda pendente</Text>
                    )}

                    <View style={style.buttonRow}>
                        <Button title="Sincronizar tudo" onPress={sendingToCloud} />
                        <Button title="Fechar" onPress={() => setShowSyncModal(false)} />
                    </View>
                    </View>
                </View>
                </Modal>
                

                <View style={style.containerServicos}>
                    <Text style={style.tituloCategoria}>Serviços</Text>

                    <View style={style.cardServicos}>
                        <Pressable style={style.itemServico} onPress={()=> router.navigate("/clients")}>
                            <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.slate_900} />
                            <Text style={style.label}>Listar clientes</Text>
                        </Pressable>

                        <Pressable style={style.itemServico} onPress={() =>router.navigate("/clients/add")}>
                            <MaterialCommunityIcons name="account-plus" size={24} color={theme.colors.slate_900} />
                            <Text style={style.label}>Cadastrar cliente</Text>
                        </Pressable>
                    </View>

                    <View style={style.cardServicos}>
                        <Pressable style={style.itemServico} onPress={()=> router.navigate("/products")}>
                            <MaterialCommunityIcons name="cake" size={24} color={theme.colors.slate_900} />
                            <Text style={style.label}>Listar produtos</Text>
                        </Pressable>

                        <Pressable style={style.itemServico} onPress={() => router.navigate("/products/add")}>
                            <MaterialCommunityIcons name="plus-box" size={24} color={theme.colors.slate_900} />
                            <Text style={style.label}>Cadastrar produto</Text>
                        </Pressable>
                    </View>

                    <View style={style.cardServicos}>
                        <Pressable style={style.itemServico} onPress={()=> router.navigate("/sales")}>
                            <MaterialCommunityIcons name="clipboard-edit" size={24} color={theme.colors.slate_900} />
                            <Text style={style.label}>Listar vendas</Text>
                        </Pressable>

                        <Pressable style={style.itemServico} onPress={()=> router.navigate("/sales/addSale")}>
                            <MaterialCommunityIcons name="cart-plus" size={24} color={theme.colors.slate_900} />
                            <Text style={style.label}>Cadastrar venda</Text>
                        </Pressable>
                    </View>



                </View>

                
            </View>

            <Menu />
        </View>
    )
}