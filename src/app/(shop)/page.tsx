"use client"

import { useEffect, useMemo, useState } from "react";
import CategoryFilter from "@/src/components/category/CategoryFilter";
import ProductCard from "@/src/components/product/ProductCard";
import ProductFilter from "@/src/components/product/ProductFilter";
import ProductGridSkeleton from "@/src/components/skeletons/ProductGridSkeleton";
import { useProducts } from "@/src/hooks/useProducts";
import { useSearchParams } from "next/navigation";

type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "";

export default function Page() {

    const searchParams = useSearchParams();

    const { products, isLoading } = useProducts();
    const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get("category") ? [searchParams.get("category")] : []);
    const [sort, setSort] = useState<SortOption>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        if (isLoading) return;

        (async function(){ 
            setIsFiltering(true); 
        })();
        
        const timeoutId = setTimeout(() => setIsFiltering(false), 250);

        return () => clearTimeout(timeoutId);
    }, [selectedCategories, sort, searchTerm, isLoading]);

    const filteredProducts = useMemo(() => {
        let list = products;

        if (selectedCategories.length > 0) {
            list = list.filter((product) =>
                product.category ? selectedCategories.includes(product.category) : false
            );
        }

        const term = searchTerm.trim().toLowerCase();
        if (term) {
            list = list.filter((product) => {
                const name = product.name?.toLowerCase() ?? "";
                const description = product.description?.toLowerCase() ?? "";
                const category = product.category?.toLowerCase() ?? "";

                return (
                    name.includes(term) ||
                    description.includes(term) ||
                    category.includes(term)
                );
            });
        }

        const sorted = [...list];
        switch (sort) {
            case "price_asc":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "name_asc":
                sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
                break;
            case "name_desc":
                sorted.sort((a, b) => b.name.localeCompare(a.name, "pt-BR"));
                break;
            default:
                break;
        }

        return sorted;
    }, [products, searchTerm, selectedCategories, sort]);

    const isGridLoading = isLoading || isFiltering;

    return (
        <section>
            <div>
                <CategoryFilter
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                />

                <div className="flex flex-wrap p-4">
                    <ProductFilter
                        sort={sort}
                        onSortChange={setSort}
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                    />

                    {isGridLoading ? (
                        <ProductGridSkeleton />
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard
                                product={product}
                                key={product.id}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
