import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/authContext";
import { useSales } from "@/lib/useSales";
import { ProductSaleProps, SaleProps } from "@/types/sales";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { commonStyles } from "./styles";
import { View } from "react-native";
import { saveToStorage } from "@/storage/storageMethods";


export default function Sale(){
    const {id} = useLocalSearchParams<{id:string}>();
    const {user} = useAuth();
    const supabaseSales = useSales();
    const [sale,setSale] = useState<SaleProps>()
    const [productsSale,setProductsSale] = useState<ProductSaleProps[]>([]);

    async function loadSale() {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }
            const response = await supabaseSales.fetchSale(id);
            //console.log(response);
            if(response.success && response.data) setSale(response.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    async function loadProductSales() {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }
            const response = await supabaseSales.fetchProductsSale(id);
            if(response.success && response.data) {setProductsSale(response.data)}
        } catch (error) {
            console.log(error);
        }
    }

    function confirmChangeStatus(id:string,status_delivery:boolean,name:string){
        Alert.alert("Aviso","Tem certeza que deseja alterar o status da venda ?",[
            {
                text: "Sim",
                style: "default",
                onPress: () => changeStatus(id,status_delivery,name)
            },
            {
                text: "Não",
                style: "cancel",
                onPress: () => {}
            }
        ]);
    }

    function confirmDeleteSale(id:string, name:string){
         Alert.alert("Aviso","Tem certeza que deseja excluir a venda ?",[
            {
                text: "Sim",
                style: "default",
                onPress: () => dropSale(id,name)
            },
            {
                text: "Não",
                style: "cancel",
                onPress: () => {}
            }
        ]);
    }

    async function changeStatus(id:string,status_delivery:boolean,name:string) {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const response = await supabaseSales.changeStatus(id,!status_delivery);

            if(response.success){
                Alert.alert("Aviso","O status da venda foi alterado com sucesso.");
                if (sale) {
                setSale(state => {
                    if (!state) return state; // retorna o valor atual se for undefined
                    return { ...state, status_delivery: !status_delivery };
                });
                }

            }else{
                const localStorageResponse = await saveToStorage<{id:string,status_delivery:boolean,name:string}>("@change_status_pending",[{id,status_delivery:!status_delivery,name}]);
                if(localStorageResponse){
                    Alert.alert("Aviso","Houve um erro ao trocar o status da venda na nuvem, o app fará isso automaticamente em instantes.");
                    router.replace("/home");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function dropSale(id:string, name:string) {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const response = await supabaseSales.deleteSale(id);

            if(response.success){
                Alert.alert("Aviso","O status da venda foi excluída com sucesso.");
                router.replace("/sales");
            }else{
                const localStorageResponse = await saveToStorage<{id:string,name:string}>("@delete_sale_pending",[{id,name}]);
                if(localStorageResponse){
                    Alert.alert("Aviso","Houve um erro ao deletar a venda na nuvem, o app fará isso automaticamente em instantes.");
                    router.replace("/home");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        loadSale();
        loadProductSales();
    },[])



    return(
        <Container>
            <Header title="Venda" 
                hasBackButton 
                hasMenuPopup 
                itens={["Adicionar produto a venda","Alterar status da venda","Alterar dados da venda","Alterar quantidade dos produtos","Deletar produto da venda" ,"Deletar venda"]} 
                functions={[
                    () => router.push({pathname:"/sales/addProductToSale",params:{id:id,total_value:sale?.total_value}}),
                    ()=> sale && confirmChangeStatus(id,sale?.status_delivery,sale.clients.name),
                    ()=> router.push({pathname: "/sales/editSale",params:{id:id }}),
                    ()=> router.push({pathname: "/sales/updateProductQuantity",params:{id:id, total_value: sale?.total_value}}),
                    () => router.push({pathname:"/sales/deleteProductFromSale", params: {id:id,total_value:sale?.total_value}}),
                    () => sale && confirmDeleteSale(id,sale.clients.name) ]}
                divisor={[1,4]}
            />

            <Form>
                 {sale && (
                    <View style={commonStyles.section}>
                        <Text style={commonStyles.titleSection}>Detalhes da Venda</Text>
                        <Text style={commonStyles.saleInformation}>Cliente: {sale.clients.name}</Text>
                        {sale.party_theme && <Text style={commonStyles.saleInformation}>Tema da Festa: {sale.party_theme}</Text>}
                        {sale.birthday_person_name &&sale.age_to_complete && (<Text style={commonStyles.saleInformation}>Aniversariante: {sale.birthday_person_name} ({sale.age_to_complete} anos)</Text>) }
                        <Text style={commonStyles.saleInformation}>Data do Pedido: {new Date(sale.order_date+"T08:00:00.000Z").toLocaleDateString()}</Text>
                        <Text style={commonStyles.saleInformation}>Data de Entrega: {new Date(sale.delivery_date+"T08:00:00.000Z").toLocaleDateString()}</Text>
                        <Text style={commonStyles.saleInformation}>Valor de Entrada: R$ {sale.entry_value}</Text>
                        <Text style={commonStyles.saleInformation}>Valor Total: R$ {sale.total_value}</Text>
                        <Text style={commonStyles.saleInformation}>Valor Restante: R$ {sale.total_value - sale.entry_value}</Text>
                        <Text style={commonStyles.saleInformation}>Data do Pagamento Restante: {new Date(sale.remaining_payment_date+"T08:00:00.000Z").toLocaleDateString()}</Text>
                        <Text style={commonStyles.saleInformation}>Método de Pagamento: {sale.payment_method}</Text>
                        <Text style={commonStyles.saleInformation}>Status da Entrega: {sale.status_delivery ? "Entregue" : "Pendente"}</Text>
                        {sale.observations && <Text style={commonStyles.saleInformation}>Observações: {sale.observations}</Text>}
                    </View>
                    )}

                    {productsSale.length > 0 && (
                    <View style={[commonStyles.sectionProducts,{marginBottom:40}]}>
                        <Text style={commonStyles.titleSection}>Produtos da Venda</Text>
                        {productsSale.map((product) => (
                            <View key={product.product_id} style={commonStyles.productItem}>
                                <Text style={commonStyles.productName} numberOfLines={1}>{product.products.name}</Text>
                                <Text style={commonStyles.productInfo}>Quantidade: {product.quantity}</Text>
                                <Text style={commonStyles.productInfo}>Preço Unitário: R$ {product.unit_price}</Text>
                            </View>
                        ))}
                    </View>
                    )}
                    
                    
            </Form>

        </Container>
    )
}