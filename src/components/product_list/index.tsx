import { TouchableOpacity, ScrollView, Text, View, TextInput } from "react-native";
import { style } from "./style";
import { ProductListProps } from "@/types/products";
import { useState } from "react";

type MultiSelectProps = {
    products: ProductListProps[],
    selectedProducts: ProductListProps[],
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductListProps[]>>
}

export function ProductList({products,selectedProducts,setSelectedProducts}:MultiSelectProps){
    const [search,setSearch] = useState("");
    const [inputSelected, setInputSelected] = useState(false);

    function toggleProductSelected(product:ProductListProps){
        setSelectedProducts(prevState => {
            const existingProduct = prevState.some((p) => p.id===product.id);

            if(existingProduct){
                return prevState.filter((p) => p.id!==product.id)
            }else{
                return [...prevState,product]
            }
        })
    }

    const filteredProducts = search.length>0 
    ? products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    : products
    return(
        <View style={{flex:1}}>
            <Text style={style.title}>Selecione os produtos</Text>
                {/* <View style={style.containerInput}>
                    <TextInput style={style.input} placeholder="Pesquise um produto" />
                </View> */}
            <ScrollView style={style.container} stickyHeaderIndices={[0]}>
                 <View style={style.containerInput}>
                    <TextInput style={[style.input]} placeholder="Pesquise um produto" 
                    onChangeText={setSearch} 
                    placeholderTextColor="#AAA"
                    />
                </View>
                {filteredProducts.map(product => (
                    <TouchableOpacity key={product.id} 
                    style={[style.productItem, selectedProducts.some(p => p.id==product.id) && style.productItemSelected]} 
                    onPress={() => toggleProductSelected(product)}>
                        <Text style={[style.text, selectedProducts.some(p => p.id==product.id) && {color:"#FFF"}]}>{product.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    )
}