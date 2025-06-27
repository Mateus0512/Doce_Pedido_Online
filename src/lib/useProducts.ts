import { clearStorage, getFromStorage, saveToStorage } from "@/storage/storageMethods";
import { supabase } from "./supabase";
import { ProductProps } from "@/types/products";

export function useProducts(){
    async function fetchProducts(user_id:string) {
        const products = await getFromStorage<ProductProps>("@products");
        if(products && products?.length>0) return {success:true, data:products}
        try {
            const {data, error} = await supabase.from("products").select("*").eq("user_id",user_id).order("name",{ascending:true}).overrideTypes<ProductProps[],{ merge: false }>();
            
            if(error){
                return {success: false, message: error};
            }
            await saveToStorage<ProductProps>("@products",data);
            return {success: true, data}
        } catch (error) {
            console.log(error);
            return {success: false, message: error};
        }
    }

    async function createProduct(data:ProductProps) {
        try {
            const {error} = await supabase.from("products").insert({
                name: data.name,
                price: data.price,
                user_id: data.user_id
            });

            if(error){
                console.log(error);
                return {success: false, message: error};
            }

            await clearStorage("@products");
            return {success:true};
        } catch (error) {
            console.log(error);
            return {success: false, message: error};
        }
    }

    async function updateProduct(id:string,data:ProductProps) {
        try {
            const {error} = await supabase.from("products").update({
                name: data.name,
                price: data.price
            }).eq("id",id);

            if(error){
                console.log(error);
                return {success: false, message: error};
            }
            await clearStorage("@products");
            return {success: true};
        } catch (error) {
            console.log(error);
            return {success: false, message: error};
        }
    }

    async function deleteProduct(id:string) {
        try {
            const {error} = await supabase.from("products").delete().eq("id",id);

            if(error){
                console.log(error);
                return {success: false, message: error};
            }

            await clearStorage("@products");
            return {success: true};
        } catch (error) {
            console.log(error);
            return {success: false, message: error};
        }
    }

    return {fetchProducts,createProduct,updateProduct,deleteProduct}
}