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
import { router } from "expo-router";
import { saveToStorage, selectByName } from "@/storage/storageMethods";
import { Container } from "@/components/container";

export default function Add(){
    const {user} = useAuth();
    const supabaseProduct = useProducts();
    const {control, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(productSchema)});
    const [loading,setLoading] = useState(false);

    const inputRefs = {
        price: useRef<TextInput>(null),
    };

    const [inputSelected, setInputSelected] = useState({
        inputNameSelected: false,
        inputPriceSelected: false,
    }); 

    async function HandleAddProduct(data:any) {
        setLoading(true);
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const nameExists = await selectByName(data.name,"@products");
            //console.log(nameExists)

            if(nameExists?.length){
                Alert.alert("Aviso","Já existe um produto com esse nome.");
                setLoading(false);
                return;
            }
            const response = await supabaseProduct.createProduct({name: data.name, price: data.price,user_id:user.id});

            if(response.success){
                setLoading(false);
                Alert.alert("Aviso", "Produto cadastrado com sucesso.");
                router.replace("/products");
            }else{
                setLoading(false);
                const result = await saveToStorage<ProductProps>("@add_product_pending",[{name:data.name,price:data.price,user_id:user.id}]);
                if(result){
                    Alert.alert("Aviso","Houve um erro ao cadastrar o produto, o app fará isso automaticamente em instantes.");
                    router.replace("/home"); 
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <Container>
            <Header hasBackButton title='Cadastrar Produto' />
        <Form>
            <Input 
                control={control}
                name="name"
                selected={inputSelected.inputNameSelected}
                onFocus={() => setInputSelected(state => ({...state,inputNameSelected:true}))}
                onBlur={() => setInputSelected(state => ({...state,inputNameSelected:false}))}
                text="Nome"
                placeholder="Digite o nome do produto"
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
            />

            <Button title={loading ? "Cadastrando" : "Cadastrar"} onPress={handleSubmit(HandleAddProduct)}/> 
        </Form>
    </Container>
    )
}