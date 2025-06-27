import { useProducts } from "@/lib/useProducts";
import { syncPendingItems } from "./storageCRUD";
import { useClients } from "@/lib/useClients";
import { useSales } from "@/lib/useSales";
import { syncPendingSalesWithProducts } from "./syncAddSales";

export async function syncAll(
  supabaseClient: ReturnType<typeof useClients>,
  supabaseProduct: ReturnType<typeof useProducts>,
  supabaseSales: ReturnType<typeof useSales>,
  setPendingClientsNames: React.Dispatch<React.SetStateAction<{
    name: string;
    operation: string;
  }[]>>,
  setPendingProductsNames:React.Dispatch<React.SetStateAction<{
    name: string;
    operation: string;
  }[]>>,
  setPendingSalesNames:React.Dispatch<React.SetStateAction<{
    name: string;
    operation: string;
  }[]>>,
  onFinish?: () => void
) {
  await Promise.all([
    syncPendingItems({
      operationType: "adicionar",
      storageKey: "@add_clients_pending",
      supabaseOperation: (client) =>
        supabaseClient.createClient(client.user_id,
          {
            name: client.name,
            phone: client.phone,
            house_number: client.house_number || null,
            street: client.street || null,
            neighborhood: client.neighborhood || null,
            city: client.city || null,
            notes: client.notes || null,
          }),
      setPendingItemsNames: setPendingClientsNames,
      successMessage: "Cliente pendente foi sincronizado com sucesso!",
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@update_clients_pending",
      supabaseOperation: (client) =>
        supabaseClient.updateClient(client.id, {
          name: client.name,
          phone: client.phone,
          city: client.city || null,
          neighborhood: client.neighborhood || null,
          street: client.street || null,
          notes: client.notes || null,
        }),
      setPendingItemsNames: setPendingClientsNames,
      successMessage: "Cliente foi atualizado com sucesso!",
    }),
    syncPendingItems({
      operationType:"excluir",
      storageKey:"@delete_client_pending",
      supabaseOperation: (client) => 
        supabaseClient.deleteClient(client.id),
      setPendingItemsNames: setPendingClientsNames,
      successMessage: "O cliente foi excluído com sucesso!"
    }),
    syncPendingItems({
      operationType:"adicionar",
      storageKey: "@add_product_pending",
      supabaseOperation: (product) =>
        supabaseProduct.createProduct({
          name: product.name,
          price: product.price,
          user_id: product.user_id
        }),
        setPendingItemsNames: setPendingProductsNames,
        successMessage: "Produto pendente foi sincronizado com sucesso!"
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@update_product_pending",
      supabaseOperation: (product) => 
        supabaseProduct.updateProduct(product.id,{
          name: product.name,
          price: product.price
        }),
        setPendingItemsNames: setPendingProductsNames,
        successMessage: "Produto foi atualizado com sucesso!"
    }),
    syncPendingItems({
      operationType:"excluir",
      storageKey: "@delete_product_pending",
      supabaseOperation: (product) =>
        supabaseProduct.deleteProduct(product.id),
      setPendingItemsNames: setPendingProductsNames,
      successMessage: "O produto foi excluído com sucesso!"
    }),
    syncPendingSalesWithProducts(supabaseSales,setPendingSalesNames),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@change_status_pending",
      supabaseOperation: (sale) =>
        supabaseSales.changeStatus(sale.id,sale.status_delivery),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "O status da venda foi alterada com sucesso!"
    }),
    syncPendingItems({
      operationType:"excluir",
      storageKey:"@delete_sale_pending",
      supabaseOperation: (sale) => 
        supabaseSales.deleteSale(sale.id),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "A venda foi excluída com sucesso!"
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@add_product_total_value",
      supabaseOperation: sale => 
        supabaseSales.updateTotalValue(sale.id,sale.total_value),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "O valor total da venda foi atualizado!"
    }),
    syncPendingItems({
      operationType: "adicionar",
      storageKey: "@add_products_to_sale_pending",
      supabaseOperation: sale => 
        supabaseSales.createProductSale(sale.sale_id,sale.product_id,sale.quantity,sale.unit_price),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "Os produtos foram adicionados a venda com sucesso!"
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@delete_product_from_sale_total_value",
      supabaseOperation: sale => 
        supabaseSales.updateTotalValue(sale.sale_id,sale.total_value),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "O valor total da venda foi atualizado!"
    }),
    syncPendingItems({
      operationType: "excluir",
      storageKey: "@delete_product_from_sale_pending",
      supabaseOperation: sale => 
        supabaseSales.deleteProductFromSale(sale.sale_id,sale.product_id),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "Os produtos selecionados foram exluídos com sucesso!"
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@update_sales_pending",
      supabaseOperation: sale => 
        supabaseSales.updateSale(sale.id, {
          age_to_complete: sale.age_to_complete || null,
          birthday_person_name: sale.birthday_person_name || null,
          client_id: sale.client_id,
          delivery_date: sale.delivery_date, 
          entry_value: sale.entry_value,
          observations: sale.observations,
          order_date: sale.order_date,
          party_theme: sale.party_theme || null,
          payment_method: sale.payment_method || null,
          remaining_payment_date: sale.remaining_payment_date,
          total_value: sale.total_value
        }),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "A atualização da venda foi realizada com sucesso!"
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@update_product_quantity_pending",
      supabaseOperation: sale => 
        supabaseSales.updateProductsQuantityFromSale(sale.sale_id,sale.product_id,sale.quantity,sale.unit_price),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "As quantidades dos produtos foram atualizadas com sucesso."
    }),
    syncPendingItems({
      operationType: "atualizar",
      storageKey: "@update_product_quantity_total_value",
      supabaseOperation: sale => 
        supabaseSales.updateTotalValue(sale.sale_id,sale.total_value),
      setPendingItemsNames: setPendingSalesNames,
      successMessage: "O valor total da venda foi atualizado!"
    })
  ])
  if (onFinish) onFinish();

  
}
