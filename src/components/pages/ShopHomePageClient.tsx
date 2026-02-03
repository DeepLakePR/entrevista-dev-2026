"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import CategoryFilter from "@/src/components/category/CategoryFilter";
import ProductCard from "@/src/components/product/ProductCard";
import ProductFilter from "@/src/components/product/ProductFilter";
import ProductGridSkeleton from "@/src/components/skeletons/ProductGridSkeleton";
import { useProducts } from "@/src/hooks/useProducts";

type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "";

export default function ShopHomePage() {

  const searchParams = useSearchParams();

  const { products, isLoading } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category") as string] : []
  );
  
  const [sort, setSort] = useState<SortOption>("");
  const [searchTerm, setSearchTerm] = useState("");

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
            <p className="px-4 py-8 text-muted-foreground">
              Nenhum produto encontrado para os filtros selecionados.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
