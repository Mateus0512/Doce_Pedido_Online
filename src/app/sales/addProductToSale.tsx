import { Body } from "@/components/body";
import { Container } from "@/components/container";
import { FormNavigation } from "@/components/form_navigation";
import { Header } from "@/components/header";
import { ProductList } from "@/components/product_list";
import { ProductListInput } from "@/components/product_list_input";
import { useAuth } from "@/contexts/authContext";
import { useProducts } from "@/lib/useProducts";
import { useSales } from "@/lib/useSales";
import { saveToStorage } from "@/storage/storageMethods";
import { ProductListProps } from "@/types/products";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function AddProductsToSale(){
    const {id,total_value} = useLocalSearchParams<{id:string,total_value:string}>();
    const {user} = useAuth();
    const supabaseSales = useSales();
    const supabaseProducts = useProducts();
    const [products,setProducts] = useState<ProductListProps[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductListProps[]>([]);
    const [page,setPage] = useState(0);

    async function loadProducts() {
        try {
            if(!user?.id){
                Alert.alert("Erro", "Usuário não autenticado.");
                return
            }
            const resultProducts = await supabaseProducts.fetchProducts(user.id);

            if(resultProducts.success && resultProducts.data){
                const resultProductsFromSale = await supabaseSales.fetchProductsSale(id);

                if (resultProductsFromSale.success && resultProductsFromSale.data) {
                    const filteredProducts = resultProducts.data.filter(
                    product =>
                        !resultProductsFromSale.data.some(
                        productFromSale => product.id === productFromSale.product_id
                        )
                    );
                    //console.log(filteredProducts);
                    const newFilteredProducts = filteredProducts.map(product => ({
                        id: product.id || "",
                        user_id: user.id,
                        name: product.name || "",
                        price: product.price,
                        quantity: 1
                    }))
                    setProducts(newFilteredProducts);
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function AddProductsToSale() {
        try {
            const addProductResults = await Promise.all(selectedProducts.map(async product => {
                const result = await supabaseSales.createProductSale(id,product.id,product.quantity,product.price);
                return {result, product};
            }));

            const newTotal = Number(total_value) + selectedProducts.reduce((acc,current) => acc + (current.price*current.quantity) ,0);

            const result = await supabaseSales.updateTotalValue(id,newTotal);

            if(!result.success){
                await saveToStorage<{sale_id:string,total_value:number}>("@add_product_total_value",[{sale_id:id,total_value:newTotal}]);
            }

            const failedProducts = addProductResults.filter(({result}) => result.success!==true);

            if(failedProducts.length>0){
                const failedProductsToSave = failedProducts.map(failed => ({
                        sale_id: id,
                        product_id: failed.product.id,
                        quantity: failed.product.quantity,
                        unit_price: failed.product.price,
                        name:failed.product.name
                }));
                await saveToStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@add_products_to_sale_pending",failedProductsToSave);
                Alert.alert("Aviso", "Houve um erro ao salvar na nuvem, o app fará isso automaticamento em instantes.");
                router.replace("/home");
            }else{
                Alert.alert("Sucesso", "Os produtos foram adicionados com sucesso!");
                router.replace("/sales");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function prevPage(){
        setPage(page-1);
    }

    function nextPage(){
        setPage(page+1);
    }

    useEffect(()=>{
        loadProducts();
    },[]);

    

    return(
        <Container>
            <Header title="Adicionar Produto a venda" hasBackButton />
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
                handleSubmit={AddProductsToSale}
                lastPage={page==1}
                nextButtonIsDisabled={page==0&&selectedProducts.length==0}
                prevButtonIsDisabled={false}
            />
        </Container>
    )
}