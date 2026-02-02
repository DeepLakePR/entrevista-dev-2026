import type { Product } from "@/src/types/Product";

export type ProductsResponse = {
    ok: boolean;
    products: Product[];
};

export type ProductResponse = {
    ok: boolean;
    product: Product | null;
};

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
    const res = await fetch(input, init);
    return res.json() as Promise<T>;
}

export async function fetchProducts(signal?: AbortSignal): Promise<ProductsResponse> {
    const data = await fetchJson<ProductsResponse>("/api/products", { signal });

    return {
        ok: Boolean(data.ok),
        products: Array.isArray(data.products) ? data.products : []
    };
}

export async function fetchProductById(id: number, signal?: AbortSignal): Promise<ProductResponse> {
    const data = await fetchJson<ProductResponse>(`/api/products/${id}`, { signal });

    return {
        ok: Boolean(data.ok),
        product: data.product ?? null
    };
}
