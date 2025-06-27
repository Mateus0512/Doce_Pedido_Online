import AsyncStorage from "@react-native-async-storage/async-storage";

export async  function saveToStorage<T>(key: string, data: T[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(`Erro ao salvar dados na chave ${key}:`, e);
    return false;
  }
}

export async function getFromStorage<T>(key: string): Promise<T[] | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error(`Erro ao recuperar dados da chave ${key}:`, e);
    return null;
  }
}

export async function clearStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Erro ao remover dados da chave ${key}:`, e);
  }
}

export async function selectByName<T extends { name: string }>(
  name: string,
  TABLE_KEY: string
): Promise<T[] | null> {
  try {
    const items = await getFromStorage<T>(TABLE_KEY);
    if (items) {
      const selectedItems = items.filter(
        item => item.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      return selectedItems;
    }
    return null;
  } catch (e) {
    console.error(`Erro ao consultar o nome ${name}:`, e);
    return null;
  }
}

