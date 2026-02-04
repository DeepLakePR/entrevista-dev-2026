import rawProducts from "@/src/data/products.json";
import type { Product } from "@/src/types/Product";

const products = rawProducts as Product[];

export const getProductById = (id: number): Product | null =>
    products.find((product) => product.id === id) ?? null;

export const getCategories = (): string[] =>
    Array.from(
        new Set(
            products
                .map((product) => product.category)
                .filter((category): category is string => Boolean(category && category.trim()))
        )
    ).sort((a, b) => a.localeCompare(b, "pt-BR"));

export default products;
