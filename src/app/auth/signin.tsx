import { View, Text, Pressable, Alert} from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { router } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema } from '@/types/auth';
import { supabase } from '@/lib/supabase';




export default function Singup() {
    const {control, handleSubmit, formState:{errors}}  = useForm({resolver: zodResolver(signinSchema)});
    const [hidePassword,setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const [inputSelected,setInputSeleted] = useState({
        email: false,
        password: false
    });
    
    async function handleSignin(form_data: any) {
        setLoading(true)

        const {data, error} = await supabase.auth.signInWithPassword({
            email: form_data.email,
            password: form_data.password
        });

        if(error){
            if(error.message=="Invalid login credentials"){
                Alert.alert("Erro","O email ou a senha está incorreto.");
                return
            }
            Alert.alert("Erro", error.message);
            setLoading(false);
            return
        }


        setLoading(false);
        router.replace("/home");

    }

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Doce Pedido</Text>
                    <Text style={styles.slogan}>Acesse sua conta</Text>
                </View>
                <Form>
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

                    <Button title={loading ? "Acessando" : "Acessar"} onPress={handleSubmit(handleSignin)} />

                    {/* Link para cadastro */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Ainda não possui uma conta?</Text>
                        <Pressable onPress={() => router.navigate("/auth/signup")}>
                            <Text style={styles.signupLink}>Cadastre-se</Text>
                        </Pressable>
                    </View>
                </Form>
            </View>
    );
}
