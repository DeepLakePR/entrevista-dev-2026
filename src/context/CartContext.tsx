"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

type AddOptions = {
    openDrawer?: boolean;
}

type CartContextValue = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isDrawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    addItem: (product: Product, options?: AddOptions) => { added: boolean; reason?: "stock_limit" };
    removeItem: (id: number) => void;
    increment: (id: number) => { added: boolean; reason?: "stock_limit" };
    decrement: (id: number) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {

    const { value: items, setValue: setItems } = useLocalStorage<CartItem[]>("cart", []);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const addItem: CartContextValue["addItem"] = (product, options) => {
        let added = false;
        let reason: "stock_limit" | undefined;

        setItems(prev => {

            const existing = prev.find(i => i.id === product.id);
            if (!existing) {
                if (product.stock <= 0) {
                    reason = "stock_limit";
                    return prev;
                }

                added = true;

                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        stock: product.stock,
                        quantity: 1
                    }
                ]
            }

            if (existing.quantity >= existing.stock) {
                reason = "stock_limit";
                return prev;
            }

            added = true;
            return prev.map(i =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            )

        });

        if (options?.openDrawer) setDrawerOpen(true);

        return { added, reason };
    }

    const increment: CartContextValue["increment"] = (id) => {

        let added = false;
        let reason: "stock_limit" | undefined;

        setItems(prev =>
            prev.map(i => {
                if (i.id !== id) return i;
                if (i.quantity >= i.stock) {
                    reason = "stock_limit";
                    return i;
                }
                added = true;
                return { ...i, quantity: i.quantity + 1 };
            })
        )

        return { added, reason };
    }

    const decrement: CartContextValue["decrement"] = (id) => {
        setItems(prev =>
            prev
                .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
                .filter(i => i.quantity > 0)
        )
    }

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
    }

    const clear = () => setItems([]);

    const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
    const totalPrice = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity * i.price, 0),
        [items]
    )

    const value: CartContextValue = {
        items,
        totalItems,
        totalPrice,
        isDrawerOpen,
        setDrawerOpen,
        addItem,
        removeItem,
        increment,
        decrement,
        clear
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used with CartProvider");
    return ctx;
}
