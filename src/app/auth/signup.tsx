import { View, Text, Pressable, Alert} from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from 'expo-router';
import { signupSchema } from '@/types/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from '@/lib/supabase';


export default function Singin() {
    const {control, handleSubmit,formState:{errors}}  = useForm({resolver:zodResolver(signupSchema)});
    const [hidePassword,setHidePassword] = useState(true);
    const [loading,setLoading] = useState(false);

    const [inputSelected,setInputSeleted] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    
    async function handleSignup(data_form:any) {
        setLoading(true);

        const {data, error} = await supabase.auth.signUp({
            email:data_form.email,
            password: data_form.password,
            options:{
                data:{
                    display_name: data_form.name
                }
            }
        })

        if(error){
            Alert.alert("Erro", error.message);
            setLoading(false);
            return
        }

        setLoading(false);
        router.replace("/auth/signin");
    }

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={()=> router.back()}>
                        <MaterialCommunityIcons name='arrow-left' color="#fff" size={24}/>
                    </Pressable>
                    <Text style={[styles.title,{marginTop:20}]}>Criar uma conta</Text>
                </View>
                <Form>
                    <Input 
                        control={control}
                        name='name'
                        selected={inputSelected.name}
                        onFocus={()=> setInputSeleted(state => ({...state,name:true}))}
                        onBlur={()=> setInputSeleted(state => ({...state,name:false}))}
                        text='Nome da loja'
                        placeholder='Digite o nome da loja'
                        error={errors.name?.message}
                    />
                    <Input 
                        name='email'
                        control={control}
                        selected={inputSelected.email}
                        onFocus={()=> setInputSeleted(state => ({...state,email:true}))}
                        onBlur={()=> setInputSeleted(state => ({...state,email:false}))}
                        text='Email'
                        placeholder='Digite seu email'
                        error={errors.email?.message}
                    />
                    <Input 
                        control={control}
                        name='password'
                        selected={inputSelected.password}
                        onFocus={()=> setInputSeleted(state => ({...state,password:true}))}
                        onBlur={()=> setInputSeleted(state => ({...state,password:false}))}
                        text='Senha'
                        placeholder='Digite sua senha'
                        secureTextEntry={hidePassword}
                        isPasswordInput
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        error={errors.password?.message}
                    />

                    <Input 
                        control={control}
                        name='confirmPassword'
                        selected={inputSelected.password}
                        onFocus={()=> setInputSeleted(state => ({...state,confirmPassword:true}))}
                        onBlur={()=> setInputSeleted(state => ({...state,confirmPassword:false}))}
                        text='Repita sua senha'
                        placeholder='Repita sua senha'
                        secureTextEntry={hidePassword}
                        isPasswordInput
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        error={errors.confirmPassword?.message}
                    />

                    <Button title={loading ? "Cadastrando" : "Cadastrar"} onPress={handleSubmit(handleSignup)}/>

                </Form>
            </View>
    );
}
