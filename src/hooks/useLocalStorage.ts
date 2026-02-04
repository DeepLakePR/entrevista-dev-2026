"use client";

import { useEffect, useRef, useState } from "react";
import {
  readLocalStorageValue,
  writeLocalStorageValue,
} from "@/src/lib/storage/local-storage";

type SetValue<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const initialValueRef = useRef(initialValue);
  const skipNextWriteRef = useRef(true);

  useEffect(() => {
    skipNextWriteRef.current = true;
    setValue(readLocalStorageValue(key, initialValueRef.current));
  }, [key]);

  useEffect(() => {
    if (skipNextWriteRef.current) {
      skipNextWriteRef.current = false;
      return;
    }

    writeLocalStorageValue(key, value);
  }, [key, value]);

  const setStoredValue = (next: SetValue<T>) => {
    setValue((prev) =>
      typeof next === "function" ? (next as (previous: T) => T)(prev) : next
    );
  };

  return { value, setValue: setStoredValue };
}
