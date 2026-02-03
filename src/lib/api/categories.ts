export type CategoriesResponse = {
    ok: boolean;
    categories: string[];
};

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
    const res = await fetch(input, init);
    return res.json() as Promise<T>;
}

export async function fetchCategories(signal?: AbortSignal): Promise<CategoriesResponse> {
    const data = await fetchJson<CategoriesResponse>("/api/categories", { signal });

    return {
        ok: Boolean(data.ok),
        categories: Array.isArray(data.categories) ? data.categories : []
    };
}
