"use client";

import { Filter } from "lucide-react";

import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "";

type ProductFilterProps = {
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
};

export default function ProductFilter({
  sort,
  onSortChange,
  searchTerm,
  onSearchTermChange,
}: ProductFilterProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 px-4 py-2">
      <div className="flex flex-col gap-1 w-2/4">
      
        <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="lg:w-80" aria-labelledby="sort-products-label">
            <Filter aria-hidden="true" />
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>

          <SelectContent>

            <SelectGroup>
              <SelectLabel>Preco</SelectLabel>
              <SelectItem value="price_asc">Crescente</SelectItem>
              <SelectItem value="price_desc">Decrescente</SelectItem>
            </SelectGroup>

            <SelectSeparator />

            <SelectGroup>
              <SelectLabel>Ordem alfabetica</SelectLabel>
              <SelectItem value="name_asc">A-Z</SelectItem>
              <SelectItem value="name_desc">Z-A</SelectItem>
            </SelectGroup>

          </SelectContent>
        </Select>
      </div>

      <div className="flex w-2/4 flex-col gap-1 lg:w-auto">
        <Input
          id="search-products"
          type="search"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          className="lg:min-w-80"
        />
      </div>
    </div>
  );
}
