import { Alert } from "react-native";
import { clearStorage, getFromStorage, saveToStorage } from "./storageMethods";

type SyncOperation = "adicionar" | "atualizar" | "excluir";

type ItemWithName = {
  name: string;
  [key: string]: any;
};

interface SyncOptions<T extends ItemWithName> {
  operationType: SyncOperation;
  storageKey: string;
  supabaseOperation: (item: T) => Promise<{ success: boolean }>;
  setPendingItemsNames: React.Dispatch<React.SetStateAction<{ name: string; operation: string }[]>>;
  successMessage?: string;
}

export async function syncPendingItems<T extends ItemWithName>({
  operationType,
  storageKey,
  supabaseOperation,
  setPendingItemsNames,
  successMessage,
}: SyncOptions<T>) {
  const pendingItems = await getFromStorage<T>(storageKey) || [];

  if (pendingItems.length === 0) return;

  const results = await Promise.allSettled(
    pendingItems.map((item) =>
      supabaseOperation(item).then((result) => ({ item, result }))
    )
  );

  const succeeded: string[] = [];
  const failed: T[] = [];

  for (const res of results) {
    if (res.status === "fulfilled") {
      const { item, result } = res.value;
      if (result.success) {
        succeeded.push(item.name);
      } else {
        failed.push(item);
        setPendingItemsNames((state) => [...state, { name: item.name, operation: operationType }]);
      }
    } else {
      console.error("Erro ao sincronizar item:", res.reason);
    }
  }

  if (failed.length > 0) {
    await saveToStorage(storageKey, failed);
    return;
  }

  if (succeeded.length > 0) {
    await clearStorage(storageKey);
    if (successMessage) {
      Alert.alert("Sucesso", successMessage);
    }
  }
}
