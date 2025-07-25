import { Alert, TextInput } from "react-native";
import { Header } from "@/components/header";
import { Form } from "@/components/form";
import { useRef, useState } from "react";
import { Input } from "@/components/input";
import { ProductProps, productSchema } from "@/types/products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { useAuth } from "@/contexts/authContext";
import { useProducts } from "@/lib/useProducts";
import { router, useLocalSearchParams } from "expo-router";
import { saveToStorage, selectByName } from "@/storage/storageMethods";
import { Container } from "@/components/container";

export default function Update(){
    const {id, name,price} = useLocalSearchParams<{id:string,name:string,price:string}>();
    const {user} = useAuth();
    const supabaseProduct = useProducts();
    const {control, handleSubmit,getValues, formState:{errors}} = useForm({resolver:zodResolver(productSchema),defaultValues:{
        name: name,
        price: Number(price)
    }});
    const [loading,setLoading] = useState(false);

    const inputRefs = {
        price: useRef<TextInput>(null),
    };

    const [inputSelected, setInputSelected] = useState({
        inputNameSelected: false,
        inputPriceSelected: false,
    }); 

    async function HandleUpdateProduct() {
        setLoading(true);
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }
            const data = getValues();

            const nameExists = await selectByName<ProductProps>(data.name,"@products");

            if (nameExists?.length && nameExists[0].id !== id){
                Alert.alert("Aviso","Já existe um produto com esse nome.");
                setLoading(false);
                return;
            }
            const response = await supabaseProduct.updateProduct(id,{name: data.name, price: Number(data.price)});

            if(response.success){
                setLoading(false);
                Alert.alert("Aviso", "Produto atualizado com sucesso.");
                router.replace("/products");
            }else{
                setLoading(false);
                const result = await saveToStorage<ProductProps>("@update_product_pending",[{id:id,name:data.name,price:Number(data.price),user_id:user.id}]);
                if(result){
                    Alert.alert("Aviso","Houve um erro ao atualizar o produto, o app fará isso automaticamente em instantes.");
                    router.replace("/home"); 
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <Container>
            <Header hasBackButton title='Atualizar Produto' />
        <Form>
            <Input 
                control={control}
                name="name"
                selected={inputSelected.inputNameSelected}
                onFocus={() => setInputSelected(state => ({...state,inputNameSelected:true}))}
                onBlur={() => setInputSelected(state => ({...state,inputNameSelected:false}))}
                text="Nome"
                placeholder="Digite o nome do produto"
                error={errors.name?.message}
            />

            <Input 
                control={control}
                name="price"
                selected={inputSelected.inputPriceSelected}
                onFocus={() => setInputSelected(state => ({...state,inputPriceSelected:true}))}
                onBlur={() => setInputSelected(state => ({...state,inputPriceSelected:false}))}
                text="Valor"
                placeholder="Digite o valor do produto"
                keyboardType="numeric"
                error={errors.price?.message}
            />

            <Button title={loading ? "Atualizando" : "Atualizar"} onPress={handleSubmit(HandleUpdateProduct)}/> 
        </Form>
    </Container>
    )
}