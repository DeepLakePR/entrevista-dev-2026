"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/src/lib/api/categories";

type UseCategoriesResult = {
    categories: string[];
    isLoading: boolean;
};

export function useCategories(): UseCategoriesResult {
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        async function getCategories() {
            setIsLoading(true);

            fetchCategories(controller.signal)
                .then((data) => {
                    if (!isActive) return;
                    setCategories(data.categories ?? []);
                })
                .catch(() => {
                    if (!isActive) return;
                    setCategories([]);
                })
                .finally(() => {
                    if (!isActive) return;
                    setIsLoading(false);
                });
        }

        getCategories();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, []);

    return { categories, isLoading };
}
