import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

interface AuthContextProps {
    user: User | null;
    setAuth: (authUser: User | null) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    function setAuth(authUser: User | null) {
        setUser(authUser);
    }

    useEffect(() => {
        // Atualiza a sessão do usuário ao mudar o estado de autenticação
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            if(session?.user){
                router.replace("/home");
            }else{
                router.replace("/auth/signin");
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ user, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
