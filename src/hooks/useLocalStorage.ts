"use client";

import { useEffect, useState } from "react";

type SetValue<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {

    const [value, setValue] = useState<T>(initialValue);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (typeof window === undefined || typeof window === null)
            throw new Error("Window is undefined");

        try {
            const stored = window.localStorage.getItem(key);
            if (stored != null) {
                setValue(JSON.parse(stored) as T);
            }
        } catch {

        } finally {
            setIsReady(true);
        }
    }, [key]);

    useEffect(() => {

        if(!isReady) return;

        try{
            window.localStorage.setItem(key, JSON.stringify(value));
        }catch{}

    }, [key, value, isReady]);

    const setStoredValue = (next: SetValue<T>) => {
        setValue(prev => (typeof next === "function" ? (next as (p: T) => T)(prev) : next));
    }

    return { value, setValue: setStoredValue, isReady };
}
