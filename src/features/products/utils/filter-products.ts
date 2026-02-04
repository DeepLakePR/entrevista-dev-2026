import type { Product } from "@/src/types/Product";
import type { ProductFilterState, SortOption } from "../types";

type SortComparator = (a: Product, b: Product) => number;

const sortComparators: Record<Exclude<SortOption, "">, SortComparator> = {
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  name_asc: (a, b) => a.name.localeCompare(b.name, "pt-BR"),
  name_desc: (a, b) => b.name.localeCompare(a.name, "pt-BR"),
};

function matchesCategories(product: Product, selectedCategories: string[]): boolean {
  if (selectedCategories.length === 0) return true;
  return product.category ? selectedCategories.includes(product.category) : false;
}

function matchesSearchTerm(product: Product, searchTerm: string): boolean {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return true;

  const name = product.name?.toLowerCase() ?? "";
  const description = product.description?.toLowerCase() ?? "";
  const category = product.category?.toLowerCase() ?? "";

  return name.includes(term) || description.includes(term) || category.includes(term);
}

export function filterAndSortProducts(
  products: Product[],
  { selectedCategories, searchTerm, sort }: ProductFilterState
): Product[] {
  const filteredProducts = products.filter((product) => {
    return (
      matchesCategories(product, selectedCategories) &&
      matchesSearchTerm(product, searchTerm)
    );
  });

  const sortedProducts = [...filteredProducts];
  const comparator = sort ? sortComparators[sort] : null;

  if (comparator) {
    sortedProducts.sort(comparator);
  }

  return sortedProducts;
}
