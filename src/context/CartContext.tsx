"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  addProductToCart,
  calculateCartTotals,
  decrementCartItemQuantity,
  incrementCartItemQuantity,
  type CartActionResult,
  type CartToggleResult,
  toggleProductInCart,
} from "@/src/features/cart/utils/cart-state";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

type AddOptions = {
  openDrawer?: boolean;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (product: Product, options?: AddOptions) => CartActionResult;
  toggleItem: (product: Product, options?: AddOptions) => CartToggleResult;
  isInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
  removeItem: (id: number) => void;
  increment: (id: number) => CartActionResult;
  decrement: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { value: items, setValue: setItems } = useLocalStorage<CartItem[]>("cart", []);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addItem: CartContextValue["addItem"] = useCallback(
    (product, options) => {
      let result: CartActionResult = { added: false };

      setItems((previousItems) => {
        const nextState = addProductToCart(previousItems, product);
        result = nextState.result;
        return nextState.nextItems;
      });

      if (options?.openDrawer) setDrawerOpen(true);

      return result;
    },
    [setItems]
  );

  const toggleItem: CartContextValue["toggleItem"] = useCallback(
    (product, options) => {
      let result: CartToggleResult = { added: false, removed: false };

      setItems((previousItems) => {
        const nextState = toggleProductInCart(previousItems, product);
        result = nextState.result;
        return nextState.nextItems;
      });

      if (options?.openDrawer && result.added) setDrawerOpen(true);

      return result;
    },
    [setItems]
  );

  const increment: CartContextValue["increment"] = useCallback(
    (id) => {
      let result: CartActionResult = { added: false };

      setItems((previousItems) => {
        const nextState = incrementCartItemQuantity(previousItems, id);
        result = nextState.result;
        return nextState.nextItems;
      });

      return result;
    },
    [setItems]
  );

  const decrement: CartContextValue["decrement"] = useCallback(
    (id) => {
      setItems((previousItems) => decrementCartItemQuantity(previousItems, id));
    },
    [setItems]
  );

  const removeItem = useCallback((id: number) => {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id));
  }, [setItems]);

  const clear = useCallback(() => setItems([]), [setItems]);

  const { totalItems, totalPrice } = useMemo(() => calculateCartTotals(items), [items]);

  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const isInCart = useCallback((id: number) => itemsById.has(id), [itemsById]);

  const getItemQuantity = useCallback(
    (id: number) => itemsById.get(id)?.quantity ?? 0,
    [itemsById]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      isDrawerOpen,
      setDrawerOpen,
      addItem,
      toggleItem,
      isInCart,
      getItemQuantity,
      removeItem,
      increment,
      decrement,
      clear,
    }),
    [
      items,
      totalItems,
      totalPrice,
      isDrawerOpen,
      addItem,
      toggleItem,
      isInCart,
      getItemQuantity,
      removeItem,
      increment,
      decrement,
      clear,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used with CartProvider");
  return ctx;
}
