"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../types/Product";
import type { FavoriteItem } from "../types/FavoriteItem";

type FavoritesContextValue = {
    favorites: FavoriteItem[];
    isFavorite: (id: number) => boolean;
    toggleFavorite: (product: Product) => void;
    removeFavorite: (id: number) => void;
    clearFavorites: () => void;
}

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

    const isFavorite = useCallback(
        (id: number) => favoriteIds.has(id),
        [favoriteIds]
    );

    const toggleFavorite = useCallback((product: Product) => {
        setFavorites(prev => {
            if (prev.some(f => f.id === product.id)) {
                return prev.filter(f => f.id !== product.id);
            }

            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category
                }
            ]
        })
    }, [setFavorites]);

    const removeFavorite = (id: number) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    }

    const clearFavorites = () => setFavorites([]);

    const value = { favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if(!ctx) throw new Error("useFavorites must be used with FavoritesContext");
    return ctx;
}
