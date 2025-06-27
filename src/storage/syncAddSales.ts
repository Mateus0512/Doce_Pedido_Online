import { useSales } from "@/lib/useSales";
import { clearStorage, getFromStorage, saveToStorage } from "./storageMethods";
import { Alert } from "react-native";
import { AddSaleProps } from "@/types/sales";

export async function syncPendingSalesWithProducts(
  supabaseSales: ReturnType<typeof useSales>,
  setPendingSalesNames: React.Dispatch<React.SetStateAction<{ name: string; operation: string }[]>>
) {
  const sales = await getFromStorage<AddSaleProps>("@add_sales_pending") || [];
  const productSales = await getFromStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@add_products_sale_pending") || [];

  if(sales.length<1 || productSales.length<1) return

  if(sales.length>0){
    const saleId = await supabaseSales.createSale({
      user_id: sales[0].user_id,
      client_id: sales[0].client_id,
      delivery_date: sales[0].delivery_date,
      entry_value: sales[0].entry_value,
      order_date: sales[0].order_date,
      payment_method: sales[0].payment_method,
      total_value: sales[0].total_value,
      age_to_complete: sales[0].age_to_complete,
      birthday_person_name: sales[0].birthday_person_name,
      observations: sales[0].observations,
      party_theme: sales[0].party_theme,
      remaining_payment_date: sales[0].remaining_payment_date,
    } )

    if(saleId){
      await clearStorage("@add_sales_pending");
      await clearStorage("@add_products_sales_pending");

      const addProductResults = await Promise.all(productSales.map(async product =>{
        const result = await supabaseSales.createProductSale(saleId.data, product.product_id, product.quantity, product.unit_price);
        return {result, product}
      }))

      const failedProducts = addProductResults.filter(({result})=> result.success===false);
      //const successfulProducts = addProductResults.filter(({result}) => result.success!==false);

      if(failedProducts.length>0){
        const failedProductsWithId = failedProducts.map(failed =>{
          setPendingSalesNames((state) => [...state,{name:failed.product.name,operation: "adicionar"}])
          return {
            sale_id:saleId.data,
            product_id: failed.product.product_id,
            quantity: failed.product.quantity,
            unit_price: failed.product.unit_price,
            name:failed.product.name
          }
        })

        await saveToStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@add_products_sales_pending",failedProductsWithId)
      }else{
        Alert.alert("Sucesso", "Vendas e produtos pendentes foram sincronizados com sucesso!");
      }
    }
  }else if((sales.length===0 && productSales.length>0)){
    await clearStorage("@add_products_sales_pending");

    const addProductResults = await Promise.all(productSales.map(async product =>{
      const result = await supabaseSales.createProductSale(product.sale_id, product.product_id, product.quantity, product.unit_price);
      return {result, product}
    }))


    const failedProducts = addProductResults.filter(({result})=> result.success===false);

    if(failedProducts.length>0){
      const failedProductsToSave = failedProducts.map(failed => (
        {
          sale_id: failed.product.sale_id,
          product_id: failed.product.product_id,
          quantity: failed.product.quantity,
          unit_price: failed.product.unit_price,
          name:failed.product.name
        }
      ))
      await saveToStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@add_products_sales_pending",failedProductsToSave);

    }else{
      Alert.alert("Sucesso", "Produtos pendentes foram sincronizados com sucesso!");
    }

    

  }
}