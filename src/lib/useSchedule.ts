import { getFromStorage, saveToStorage } from "@/storage/storageMethods";
import { SaleProps } from "../types/sales";
import { supabase } from "./supabase";

export function useSchedule() {
    async function fetchSalesPending(user_id:string,status_delivery=false) {
        const salesPending = await getFromStorage<SaleProps>("@sales_pending");
        if(salesPending) return {success:true, data:salesPending}
        try {
            const {data, error} = await supabase.from("sales")
            .select(`
                *,
                clients(name)
                `)
            .match({user_id,status_delivery})
            .order("created_at", { ascending: true })
            .overrideTypes<SaleProps[]>();

            if(error){
                console.error("Erro ao buscar vendas pendentes:", error.message);
                return { success: false, data: null, error: error.message };
            }
            await saveToStorage<SaleProps>("@sales_pending",data);
            return { success: true, data};
        } catch (error) {
            console.log(error);
            return { success: false, data: null, error: "Erro inesperado ao buscar vendas" };
        }
    }

    return {fetchSalesPending}
}


