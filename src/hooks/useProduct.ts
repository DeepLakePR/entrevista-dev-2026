"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/src/types/Product";
import { fetchProductById } from "@/src/lib/api/products";

type ProductParams = {
    id: number | string;
};

type UseProductResult = {
    product: Product | null;
    isLoading: boolean;
};

export function useProduct(params: Promise<ProductParams>): UseProductResult {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        async function loadProduct() {
            setIsLoading(true);
            setProduct(null);

            try {
                const resolvedParams = await params;
                const id = Number(resolvedParams.id);
                if (!Number.isFinite(id)) return;

                const data = await fetchProductById(id, controller.signal);
                if (!isActive) return;

                if (data.ok) {
                    setProduct(data.product ?? null);
                }
            } catch {
                if (!isActive) return;
                setProduct(null);
            } finally {
                if (!isActive) return;
                setIsLoading(false);
            }
        }

        loadProduct();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, [params]);

    return { product, isLoading };
}
