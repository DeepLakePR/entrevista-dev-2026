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
import { Button } from "../ui/button";

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
    <div className="flex flex-col w-full items-center justify-between gap-x-4 gap-y-2 px-4 py-2 min-[370px]:flex-row">
      <div className="flex flex-col gap-1 w-full min-[370px]:w-2/4">

        {
          sort &&
          <Button
            variant="ghost"
            className="w-30"
            size="xs"
            aria-label={`Remover filtro ${sort}`}
            onClick={() => onSortChange("")}>
            Remover Filtros
          </Button>
        }

        <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-full lg:w-75" aria-labelledby="sort-products-label">
            <Filter aria-hidden="true" />
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>

          <SelectContent>

            <SelectGroup>
              <SelectLabel>Preço</SelectLabel>
              <SelectItem value="price_asc">Crescente</SelectItem>
              <SelectItem value="price_desc">Decrescente</SelectItem>
            </SelectGroup>

            <SelectSeparator />

            <SelectGroup>
              <SelectLabel>Ordem Alfabética</SelectLabel>
              <SelectItem value="name_asc">A-Z</SelectItem>
              <SelectItem value="name_desc">Z-A</SelectItem>
            </SelectGroup>

          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1 w-full min-[370px]:w-2/4 lg:w-auto">
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
