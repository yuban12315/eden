import { get } from "lodash-es";

export function useLocalStorage<T>(
  storageKey: string
): [() => Partial<T>, (data: Partial<T>) => void] {
  const saveValue = (data: Partial<T>) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };
  const getValue = () => {
    // 防止数据为空时报错
    const value = get(localStorage.getItem(storageKey), "", '""');
    return JSON.parse(value) as Partial<T>;
  };

  return [getValue, saveValue];
}
