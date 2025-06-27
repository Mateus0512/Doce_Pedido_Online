import { Body } from "@/components/body";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { ProductList } from "@/components/product_list";
import { useAuth } from "@/contexts/authContext";
import { useSales } from "@/lib/useSales";
import { ProductListProps } from "@/types/products";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { commonStyles } from "./styles";
import { saveToStorage } from "@/storage/storageMethods";

export default function DeleteProductFromSale(){
    const {id,total_value} = useLocalSearchParams<{id:string,total_value:string}>();
    const {user} = useAuth();
    const supabaseSales = useSales();
    const [products,setProducts] = useState<ProductListProps[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductListProps[]>([]);

    async function loadProductsSale() {
        if(!user?.id){
            Alert.alert("Erro", "Usuário não autenticado.");
            return
        }

        const resultProductsFromSale = await supabaseSales.fetchProductsSale(id);
        if(resultProductsFromSale.success && resultProductsFromSale.data){
            const productList = resultProductsFromSale.data.map(product => ({
                id: product.product_id,
                user_id: user.id,
                name: product.products.name,
                price: product.unit_price,
                quantity: product.quantity,
            }));
            setProducts(productList);
        }
    }

    async function handleDeleteProduct() {
        try {
            const results = await Promise.all(selectedProducts.map(async product => {
                const result = await supabaseSales.deleteProductFromSale(id,product.id);
                return {result, product};
            }));

            const total = Number(total_value) - selectedProducts.reduce((acc,current) => acc+(current.price*current.quantity) ,0);

            const resultUpdateTotal = await supabaseSales.updateTotalValue(id,total);

            if(!resultUpdateTotal.success){
                await saveToStorage<{sale_id:string,total_value:number}>("@delete_product_from_sale_total_value",[{sale_id:id,total_value:total}]);
            }

            const failedProducts = results.filter(({result}) => result.success!==true);

            if(failedProducts.length>0){
                const failedProductsToSave = failedProducts.map(failed => ({
                        sale_id: id,
                        product_id: failed.product.id,
                        quantity: failed.product.quantity,
                        unit_price: failed.product.price,
                        name:failed.product.name
                }));
                await saveToStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@delete_product_from_sale_pending",failedProductsToSave);
                Alert.alert("Aviso", "Houve um erro ao salvar na nuvem, o app fará isso automaticamento em instantes.");
                router.replace("/home");

            }else{
                Alert.alert("Sucesso", "Os produtos foram excluídos com sucesso!");
                router.replace("/sales");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleConfirm(){
        Alert.alert("Aviso","Têm certeza que deseja excluír os produtos selecionados",[
            {
                text: "Sim",
                style:"destructive",
                onPress: handleDeleteProduct
            },
            {
                text: "Não",
                style: "cancel",
                onPress: () => {}
            }
        ])
    }





    useEffect(() => {
        loadProductsSale();
    },[]);

    return(
        <Container>
            <Header title="Deletar produto da venda" hasBackButton />
            <Body>
                <ProductList 
                    products={products}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                />
            </Body>
            <View style={commonStyles.buttonContainer}>
                <Pressable style={[commonStyles.button,selectedProducts.length==0 && commonStyles.buttonDisabled ]} onPress={handleConfirm} disabled={selectedProducts.length==0}>
                    <Text style={[commonStyles.buttonText,selectedProducts.length==0 &&  commonStyles.buttonTextDisabled]}>Deletar</Text>
                </Pressable>
            </View>
        </Container>
    )
}