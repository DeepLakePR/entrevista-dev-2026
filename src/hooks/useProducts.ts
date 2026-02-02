"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/src/types/Product";
import { fetchProducts } from "@/src/lib/api/products";

type UseProductsResult = {
    products: Product[];
    isLoading: boolean;
};

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        async function getProducts() {

            setIsLoading(true);

            fetchProducts(controller.signal)
                .then((data) => {
                    if (!isActive) return;
                    setProducts(data.products ?? []);
                })
                .catch(() => {
                    if (!isActive) return;
                    setProducts([]);
                })
                .finally(() => {
                    if (!isActive) return;
                    setIsLoading(false);
                });
        }

        getProducts();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, []);

    return { products, isLoading };
}
