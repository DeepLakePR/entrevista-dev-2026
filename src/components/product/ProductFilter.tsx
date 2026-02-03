"use client";

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
import { Input } from "@/src/components/ui/input"
import { Filter } from "lucide-react";

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
    onSearchTermChange
}: ProductFilterProps) {
    return (
        <div className="flex w-full items-center gap-8 px-4 justify-between">
            <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
                <SelectTrigger className="w-80">
                    <Filter/>
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

            <Input
                placeholder="Buscar"
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                className="lg:max-w-1/3"
            />
        </div>
    );
}
