import { TextInput, Alert} from 'react-native';
import { useRef, useState } from 'react';
import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { router } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientProps, clientSchema } from '@/types/clients';
import { useAuth } from '@/contexts/authContext';
import { useClients } from '@/lib/useClients';
import { saveToStorage, selectByName } from '@/storage/storageMethods';
import { Header } from '@/components/header';
import { Container } from '@/components/container';


export default function Add() {
    const {control, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(clientSchema)});
    const [loading,setLoading] = useState(false);
    const {user} = useAuth();
    const supabaseClients = useClients();

    const inputRefs = {
        phone: useRef<TextInput>(null),
        house_number: useRef<TextInput>(null),
        street: useRef<TextInput>(null),
        neighborhood: useRef<TextInput>(null),
        city: useRef<TextInput>(null),
        notes: useRef<TextInput>(null),
    };

    const [inputSelected, setInputSelected] = useState({
        inputNameSelected: false,
        inputPhoneSelected: false,
        inputHouseNumberSelected: false,
        inputStreetSelected: false,
        inputNeighborhoodSelected: false,
        inputCitySelected: false,
        inputNotes:false
    }); 

    async function handleCreateClient(data:any){
        setLoading(true);
        if (!user?.id) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }

         const nameExists = await selectByName<ClientProps>(data.name,"@clients");

         if(nameExists?.length){
            Alert.alert("Aviso","Já existe um cliente com esse nome.");
            setLoading(false);
            return;
         }

        try {
            const response = await supabaseClients.createClient(user.id,{
                name: data.name,
                phone: data.phone,
                house_number: data.house_number,
                neighborhood: data.neighborhood,
                city: data.city,
                street: data.street,
                notes: data.notes
            })

            if(response.success){
                setLoading(false);
                Alert.alert("Aviso","O cliente foi cadastrado com sucesso!")
                router.replace("/clients");
                
            }else{
                setLoading(false);
                const result = await saveToStorage<ClientProps>("@add_clients_pending",[
                {name: data.name,
                phone: data.phone,
                house_number: data.house_number,
                street: data.street,
                neighborhood: data.neighborhood,
                city: data.city,
                notes: data.notes,
                user_id: user.id
            }]);
                if(result){
                    Alert.alert("Aviso","Houve um erro ao cadastrar o cliente, o app fará isso automaticamente em instantes.");
                    router.replace("/home");
                }
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
            <Container>

                <Header hasBackButton title='Cadastrar Cliente' />
                <Form>
                    <Input 
                            control={control}
                            name='name'
                            selected={inputSelected.inputNameSelected}
                            text='Nome'
                            onFocus={() => setInputSelected(state => ({...state, inputNameSelected:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputNameSelected:false}))}
                            placeholder='Nome'
                            error={errors.name?.message}
                            onSubmitEditing={()=> inputRefs.phone.current?.focus() }
                            enterKeyHint="next"
                        />

                        <Input
                            ref={inputRefs.phone} 
                            control={control}
                            name='phone'
                            selected={inputSelected.inputPhoneSelected}
                            text='Telefone'
                            onFocus={() => setInputSelected(state => ({...state, inputPhoneSelected:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputPhoneSelected:false}))}
                            placeholder='Telefone'
                            error={errors.phone?.message}
                            onSubmitEditing={()=> inputRefs.house_number.current?.focus() }
                            enterKeyHint="next"
                            maxLength={17}
                            keyboardType='numeric'
                        />

                        <Input
                            ref={inputRefs.house_number} 
                            control={control}
                            name='house_number'
                            selected={inputSelected.inputHouseNumberSelected}
                            text='Número da Casa'
                            onFocus={() => setInputSelected(state => ({...state, inputHouseNumberSelected:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputHouseNumberSelected:false}))}
                            placeholder='Número da Casa'
                            error={errors.house_number?.message}
                            onEndEditing={()=> inputRefs.street.current?.focus()}
                            enterKeyHint="next"
                        />

                        <Input
                            ref={inputRefs.street} 
                            control={control}
                            name='street'
                            selected={inputSelected.inputStreetSelected}
                            text='Rua'
                            onFocus={() => setInputSelected(state => ({...state, inputStreetSelected:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputStreetSelected:false}))}
                            placeholder='Rua'
                            error={errors.street?.message}
                            onEndEditing={()=> inputRefs.neighborhood.current?.focus()}
                            enterKeyHint="next"
                        />

                        <Input
                            ref={inputRefs.neighborhood} 
                            control={control}
                            name='neighborhood'
                            selected={inputSelected.inputNeighborhoodSelected}
                            text='Bairro'
                            onFocus={() => setInputSelected(state => ({...state, inputNeighborhoodSelected:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputNeighborhoodSelected:false}))}
                            placeholder='Bairro'
                            error={errors.neighborhood?.message}
                            onEndEditing={()=> inputRefs.city.current?.focus()}
                            enterKeyHint="next"
                        />

                        <Input
                            ref={inputRefs.city} 
                            control={control}
                            name='city'
                            selected={inputSelected.inputCitySelected}
                            text='Cidade'
                            onFocus={() => setInputSelected(state => ({...state, inputCitySelected:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputCitySelected:false}))}
                            placeholder='Cidade'
                            error={errors.city?.message}
                            onSubmitEditing={()=> inputRefs.notes.current?.focus()}
                            enterKeyHint="next"
                        />

                        <Input
                            ref={inputRefs.notes} 
                            control={control}
                            name='notes'
                            selected={inputSelected.inputNotes}
                            text='Notas'
                            onFocus={() => setInputSelected(state => ({...state, inputNotes:true}))}
                            onBlur={() => setInputSelected(state => ({...state, inputNotes:false}))}
                            placeholder='Notas'
                            error={errors.notes?.message}
                            onSubmitEditing={()=> console.log("teste")}
                            enterKeyHint="next"
                            multiline numberOfLines={4} textarea
                        />

                        <Button title={loading ? "Cadastrando" : "Cadastrar"} onPress={handleSubmit(handleCreateClient)}  />
                </Form>
            </Container>
    );
}
