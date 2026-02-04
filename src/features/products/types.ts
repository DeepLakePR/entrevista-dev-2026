export type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "";

export type ProductFilterState = {
  selectedCategories: string[];
  searchTerm: string;
  sort: SortOption;
};
