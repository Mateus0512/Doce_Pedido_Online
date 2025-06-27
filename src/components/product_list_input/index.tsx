import { Text, TextInput, View } from "react-native";
import { style } from "./style";
import { ProductListProps } from "@/types/products";

type ProductListInputProps = {
    selectedProducts: ProductListProps[],
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductListProps[]>>
}

export function ProductListInput({selectedProducts,setSelectedProducts}:ProductListInputProps){
    return(
        <View>
            <Text style={style.title}>Selecione as quantidades</Text>
            {selectedProducts.map(product => (
                <View key={product.id}>
                    <Text style={style.label}>{product.name}</Text>
                    <TextInput 
                        style={style.input} 
                        value={String(product.quantity)} 
                        keyboardType="numeric" 
                        onChangeText={value => {
                            const newQuantity = parseInt(value) || 0;
                            setSelectedProducts(prev =>
                            prev.map((p) =>
                                p.id === product.id ? { ...p, quantity: newQuantity } : p
                            ))

                        }}

                        onBlur={() => {
                            if(product.quantity<1){
                                setSelectedProducts(prev => prev.map((p) => p.id===product.id ? {...p, quantity: 1} : p))
                            }
                        }}
                    />
                </View>
            ))}
        </View>
    )
}