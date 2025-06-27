import { Body } from "@/components/body";
import { Container } from "@/components/container";
import { FormNavigation } from "@/components/form_navigation";
import { Header } from "@/components/header";
import { ProductList } from "@/components/product_list";
import { ProductListInput } from "@/components/product_list_input";
import { useAuth } from "@/contexts/authContext";
import { useSales } from "@/lib/useSales";
import { saveToStorage } from "@/storage/storageMethods";
import { ProductListProps } from "@/types/products";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function UpdateProductQuantity(){
    const {id, total_value} = useLocalSearchParams<{id:string,total_value:string}>();
    const {user} = useAuth();
    const supabaseSales = useSales();
    const [products, setProducts] = useState<ProductListProps[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductListProps[]>([]);
    const [page,setPage] = useState(0);
    const [totalValueMinusSelectedProducts,setTotalValueMinusSelectedProducts] = useState(0);

    async function loadProducts() {
        if(!user?.id){
            Alert.alert("Erro", "Usuário não autenticado.");
            return
        }

        const resultProducts = await supabaseSales.fetchProductsSale(id);
        if(resultProducts.success && resultProducts.data){
            //console.log(resultProducts);
            const newProductList = resultProducts.data.map(product => ({
                id: product.product_id,
                user_id: user.id,
                name: product.products.name,
                price: product.unit_price,
                quantity: product.quantity
            }))
            setProducts(newProductList);
        }
    }

    async function handleUpdateQuantity() {
        try {
            const resultsUpdate = await Promise.all(selectedProducts.map(async product => {
                const result = await supabaseSales.updateProductsQuantityFromSale(id,product.id, product.quantity, product.price);
                return {result, product};
            }));

            const newTotal = totalValueMinusSelectedProducts + selectedProducts.reduce((acc,current)=> acc+(current.price*current.quantity) ,0);

            const resultUpdateTotal = await supabaseSales.updateTotalValue(id, newTotal);

            if(!resultUpdateTotal.success){
                await saveToStorage<{sale_id:string,total_value:number}>("@update_product_quantity_total_value",[{sale_id:id,total_value:newTotal}]);
            }

            const failedProducts = resultsUpdate.filter(({result})=> result.success!==true);

            if(failedProducts.length>0){
                const failedProductsToSave = failedProducts.map(failed => ({
                        sale_id: id,
                        product_id: failed.product.id,
                        quantity: failed.product.quantity,
                        unit_price: failed.product.price,
                        name:failed.product.name
                }));
                const resultStorage = await saveToStorage<{sale_id:string, product_id:string, quantity:number, unit_price:number,name:string}>("@update_product_quantity_pending",failedProductsToSave);
                if(resultStorage){
                    Alert.alert("Aviso","Houve um erro ao atualizar as quantidades dos produtos, o app fará isso automaticamente em instantes.");
                    router.replace("/home");
                }
            }else{
                Alert.alert("Aviso","As quantidades dos produtos foram atualizadas com sucesso.");
                router.replace({pathname: "/sales/sale",params:{id:id}});
            }
        } catch (error) {
            console.log(error);
        }
    }

    function prevPage(){
        setPage(page-1);
    }

    function nextPage(){
        if(page+1==1){
            const partialTotal = Number(total_value) - selectedProducts.reduce((acc,current)=> acc+(current.price*current.quantity) ,0);
            setTotalValueMinusSelectedProducts(partialTotal);
        }
        setPage(page+1);
    }

    useEffect(()=>{
        loadProducts();
    },[]);
    
    return(
        <Container>
            <Header title="Alterar quantidade dos produtos" hasBackButton/>
            <Body>
                {page==0 && (
                    <ProductList 
                        products={products}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                    />
                )}

                {page==1 && (
                    <ProductListInput 
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                    />
                )}
            </Body>
            <FormNavigation 
                prevPage={prevPage}
                nextPage={nextPage}
                lastPage={page==1}
                nextButtonIsDisabled={selectedProducts.length==0}
                prevButtonIsDisabled={page==0}
                handleSubmit={handleUpdateQuantity}
            />
        </Container>
    )
}