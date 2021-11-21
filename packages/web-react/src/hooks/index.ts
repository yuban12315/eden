export function useLocalStorage<T>(
  storageKey: string
): [() => T, (data: Partial<T>) => void] {
  const saveValue = (data: Partial<T>) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };
  const getValue = () => {
    return JSON.parse(localStorage.getItem(storageKey) ?? "");
  };

  return [getValue, saveValue];
}
