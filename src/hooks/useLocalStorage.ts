import { useEffect, useState } from "react";

function getInitialValue<T>(key: string, initialValue: T): T {
  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return initialValue;
    }

    return JSON.parse(storedValue) as T;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    getInitialValue(key, initialValue),
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
