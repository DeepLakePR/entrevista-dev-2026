"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { toggleFavoriteProduct } from "@/src/features/favorites/utils/favorites-state";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../types/Product";
import type { FavoriteItem } from "../types/FavoriteItem";

type FavoritesContextValue = {
  favorites: FavoriteItem[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { value: favorites, setValue: setFavorites } = useLocalStorage<FavoriteItem[]>(
    "favorites",
    []
  );

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => favorite.id)),
    [favorites]
  );

  const isFavorite = useCallback((id: number) => favoriteIds.has(id), [favoriteIds]);

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((previousFavorites) =>
        toggleFavoriteProduct(previousFavorites, product)
      );
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((previousFavorites) =>
        previousFavorites.filter((favorite) => favorite.id !== id)
      );
    },
    [setFavorites]
  );

  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites]);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used with FavoritesContext");
  return ctx;
}
