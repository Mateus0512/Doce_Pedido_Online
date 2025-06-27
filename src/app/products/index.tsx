import { Alert, FlatList} from "react-native";
import { Header } from "@/components/header";
import { router } from "expo-router";
import { Body } from "@/components/body";
import { InputSearch } from "@/components/input_search";
import { useEffect, useState } from "react";
import { ProductProps } from "@/types/products";
import { useAuth } from "@/contexts/authContext";
import { useProducts } from "@/lib/useProducts";
import { ProductCard } from "@/components/product_card";
import { TotalItems } from "@/components/total_items";
import { Container } from "@/components/container";
import { Menu } from "@/components/menu";

export default function Products(){
    const {user} = useAuth();
    const supabaseProduct = useProducts();
    const [products,setProducts] = useState<ProductProps[]>([]);
    const [search,setSearch] = useState("");
    const [inputSearchSelected,setInputSearchSelected] = useState(false);

    async function loadProducts() {
        if (!user?.id) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }

        const response = await supabaseProduct.fetchProducts(user.id);

        if(response.success&& response.data){
            //console.log(response.data);
            setProducts(response.data);
        }
    }


    const filteredProducts = search.length > 0 
    ? products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    : products

    useEffect(()=>{
        loadProducts();
    },[]);

    return(
        <Container>
            <Header title="Produtos" hasMenuPopup itens={["Cadastrar Produto", "Ajuda"]} functions={[()=> router.navigate("/products/add"), () => router.navigate('/help/products')]}/>

            <Body>
                  
                <InputSearch 
                    placeholder="Procure um produto" 
                    selected={inputSearchSelected} 
                    onFocus={()=> setInputSearchSelected(true)}
                    onBlur={() => setInputSearchSelected(false)}
                    onChangeText={setSearch}
                />

                <TotalItems filteredDataLength={filteredProducts.length} screen="produtos"/> 

                <FlatList 
                    data={filteredProducts}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item})=> <ProductCard id={item.id} name={item.name} price={item.price} loadProducts={loadProducts}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:60}}
                />
            </Body>
            <Menu />

        </Container>
    )
}