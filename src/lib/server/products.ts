import rawProducts from "@/src/data/products.json";
import type { Product } from "@/src/types/Product";

const products = rawProducts as Product[];

export const getProductById = (id: number): Product | null =>
    products.find((product) => product.id === id) ?? null;

export default products;
