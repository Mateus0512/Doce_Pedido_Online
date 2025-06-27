import { clearStorage, getFromStorage, saveToStorage } from "@/storage/storageMethods";
import { supabase } from "./supabase";
import { ClientProps } from "../types/clients";

export function useClients() {
    async function fetchClients(user_id:string) {
        const clients = await getFromStorage<ClientProps>("@clients");
        if(clients) return {success: true, data:clients}

        try {
            const {data, error} = await supabase.from("clients").select("*").eq("user_id",user_id).order("name",{ascending:true}).overrideTypes<ClientProps[],{ merge: false }>()

            if(error){
                console.log(error);
                return {success: false, data:null, message:error}
            }

            await saveToStorage<ClientProps>("@clients",data);

            return {success:true, data}

        } catch (error) {
            console.log(error);
            return {success:false, data:null ,message: error}
        }
    }

    async function createClient(user_id:string, data: ClientProps) {
        await clearStorage("@clients");
        try {
            const {error} = await supabase.from("clients")
            .insert({
                name: data.name,
                phone: data.phone,
                house_number: data.house_number || null,
                street: data.street || null,
                neighborhood: data.neighborhood || null,
                city: data.city || null,
                notes: data.notes || null,
                user_id:user_id
            })

            if(error){
                console.log(error);
                return {success: false, message: error}
            }

            return {success: true}

        } catch (error) {
            console.log(error);
            return {success: false}
        }
    }

    async function updateClient(id:string, data: ClientProps) {
        await clearStorage("@clients");
        try {
            const {error} = await supabase.from("clients")
            .update({
                name: data.name,
                phone: data.phone,
                house_number: data.house_number || null,
                street: data.street || null,
                neighborhood: data.neighborhood || null,
                city: data.city || null,
                notes: data.notes || null
            })
            .eq("id",id);

            if(error){
                console.log(error);
                return {success: false, message: error}
            }

            return {success: true}

        } catch (error) {
            console.log(error);
            return {success: false}
        }
    }

    async function deleteClient(id:string) {
        await clearStorage("@clients");
        try {
            const {error} = await supabase.from("clients").delete().eq("id",id);

            if(error){
                console.log(error);
                return {success: false, message: error}
            }

            return {success:true}
        } catch (error) {
            console.log(error);
            return {success: false}
        }
    }

    return {fetchClients,createClient,updateClient,deleteClient}
}