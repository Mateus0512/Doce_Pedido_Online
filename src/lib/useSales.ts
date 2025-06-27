import { AddSaleProps, ProductSaleProps, SaleProps, UpdateSaleProps } from "@/types/sales";
import { supabase } from "./supabase";
import { clearStorage, getFromStorage, saveToStorage } from "@/storage/storageMethods";

export function useSales(){
    async function fetchSales(user_id:string) {
        const sales = await getFromStorage<SaleProps>("@sales");
        if(sales && sales?.length>0) return {success:true, data:sales}
        try {
            const {data, error} = await supabase.from("sales")
            .select(`
                *,
                clients (name)
                `)
            .eq("user_id",user_id)
            .order("created_at",{ascending:false})
            .limit(30)
            .overrideTypes<SaleProps[],{ merge: false }>()
            
            if(error){
                console.log(error);
                return {success:false, message:error};
            }
            saveToStorage<SaleProps>("@sales",data);
            return {success:true, data}
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function fetchSale(id:string) {
        const sales = await getFromStorage<SaleProps>("@sales");
        if(sales && sales?.length>0){
            const selectedSale = sales.filter((sale)=> sale.id==id);

            return {success: true,data:selectedSale}
        }
        try {
            const {data, error} = await supabase.from("sales")
                    .select(`
                        *,
                        clients (name)
                        `)
                    .eq("id",id)
                    .overrideTypes<SaleProps[],{merge:false}>();
            if(error){
                console.log(error);
                return {success:false, message:error};
            }

            return {success:true, data}
        } catch (error) {
            console.log(error);
            return {success:false};
        }
        
    }

    async function fetchProductsSale(id:string) {
        try {
            const {data, error} = await supabase.from("sale_products").select(`
                * ,
                products (name)
                `).eq("sale_id",id)
                .order(`products (name)`,{ascending:true})
                .overrideTypes<ProductSaleProps[],{merge:false}>();
            if(error){
                console.log(error);
                return {success:false, message:error};
            }

            return {success:true, data}
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function createSale(form:AddSaleProps) {
        try {
            const {data: sale_id, error} = await supabase.from("sales").insert({
                user_id: form.user_id,
                client_id: form.client_id,
                order_date: form.order_date,
                delivery_date: form.delivery_date,
                party_theme: form.party_theme || null,
                birthday_person_name: form.birthday_person_name || null,
                age_to_complete: form.age_to_complete || null,
                entry_value: form.entry_value,
                total_value: form.total_value,
                remaining_payment_date: form.remaining_payment_date || null,
                payment_method: form.payment_method,
                observations: form.observations || null,
                status_delivery: false
            }).select();

            if(error){
                console.log(error);
                return {success:false};
            }

            await clearStorage("@sales");
            await clearStorage("@sales_pending");
            return {success: true, data: sale_id[0].id};

        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function createProductSale(sale_id:string, product_id: string, quantity: number, unit_price:number) {
        try {
            const {error} = await supabase.from("sale_products").insert({
                sale_id,
                product_id,
                quantity,
                unit_price
            })

            if(error){
                console.log(error);
                return {success:false};
            }

            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function changeStatus(id:string,status_delivery:boolean) {
        try {
            const {error} = await supabase.from("sales").update({status_delivery}).eq("id",id);

            if(error){
                console.log(error);
                return {success:false};
            }
            await clearStorage("@sales");
            await clearStorage("@sales_pending");
            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function deleteSale(id:string) {
        try {
            const {error} = await supabase.from("sales").delete().eq("id",id);

            if(error){
                console.log(error);
                return {success:false};
            }
            await clearStorage("@sales");
            await clearStorage("@sales_pending");
            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function updateTotalValue(id:string,total_value:number) {
        try {
            const {error} = await supabase.from("sales").update({total_value}).eq("id",id);

            if(error){
                console.log(error);
                return {success:false};
            }

            await clearStorage("@sales");
            await clearStorage("@sales_pending");
            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function deleteProductFromSale(sale_id:string, product_id:string) {
        try {
            const {error} = await supabase.from("sale_products").delete().match({ sale_id, product_id });

            if(error){
                console.log(error);
                return {success:false};
            }

            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
        
    }

    async function updateSale(id:string, form: UpdateSaleProps) {
        try {
            const {error} = await supabase.from("sales").update({
                age_to_complete: form.age_to_complete || null,
                birthday_person_name: form.birthday_person_name || null,
                client_id: form.client_id,
                delivery_date: form.delivery_date, 
                entry_value: form.entry_value,
                observations: form.observations || null,
                order_date: form.order_date,
                party_theme: form.party_theme || null,
                payment_method: form.payment_method || null,
                remaining_payment_date: form.remaining_payment_date,
                total_value: form.total_value
            }).eq("id",id);

            if(error){
                console.log(error);
                return {success:false};
            }

            await clearStorage("@sales");
            await clearStorage("@sales_pending");
            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function updateProductsQuantityFromSale(sale_id:string,product_id:string,quantity:number,unit_price:number) {
        try {
            const {error} = await supabase.from("sale_products").update({
                quantity, unit_price
            }).match({sale_id,product_id});

            if(error){
                console.log(error);
                return {success:false};
            }

            return {success: true};
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    async function fetchSalesFromClient(client_id:string) {
        try {
            const {data, error} =  await supabase.from("sales").select(`
                *,
                clients (name)
                `).eq("client_id",client_id).order("created_at",{ascending:false})
                .overrideTypes<SaleProps[],{ merge: false }>()
            
            if(error){
                console.log(error);
                return {success:false, message:error};
            }

            return {success:true, data}
        } catch (error) {
            console.log(error);
            return {success:false};
        }
    }

    return {fetchSales,fetchSale,fetchProductsSale,createSale,createProductSale, changeStatus,deleteSale,updateTotalValue,deleteProductFromSale,updateSale,updateProductsQuantityFromSale,fetchSalesFromClient}
}