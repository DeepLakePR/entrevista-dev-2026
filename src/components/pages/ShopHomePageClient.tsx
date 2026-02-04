"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import CategoryFilter from "@/src/components/category/CategoryFilter";
import ProductCard from "@/src/components/product/ProductCard";
import ProductFilter from "@/src/components/product/ProductFilter";
import ProductGridSkeleton from "@/src/components/skeletons/ProductGridSkeleton";
import { filterAndSortProducts } from "@/src/features/products/utils/filter-products";
import type { SortOption } from "@/src/features/products/types";
import { useProducts } from "@/src/hooks/useProducts";

export default function ShopHomePage() {

  const searchParams = useSearchParams();

  const { products, isLoading } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const selectedCategory = searchParams.get("category");
    return selectedCategory ? [selectedCategory] : [];
  });
  
  const [sort, setSort] = useState<SortOption>("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, { selectedCategories, searchTerm, sort }),
    [products, searchTerm, selectedCategories, sort]
  );

  const isGridLoading = isLoading;
  const hasProducts = filteredProducts.length > 0;

  return (
    <section aria-labelledby="products-heading">
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

          <p className="sr-only" role="status" aria-live="polite">
            {isGridLoading
              ? "Atualizando lista de produtos."
              : `${filteredProducts.length} produtos encontrados.`}
          </p>

          {isGridLoading ? (
            <ProductGridSkeleton />
          ) : hasProducts ? (
            filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <p className="px-4 py-8 text-muted-foreground w-full text-center h-[60vh]">
              Nenhum produto encontrado para os filtros selecionados.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
