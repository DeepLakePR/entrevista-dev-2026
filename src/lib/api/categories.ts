import { fetchJson } from "./fetch-json";

export type CategoriesResponse = {
    ok: boolean;
    categories: string[];
};

export async function fetchCategories(signal?: AbortSignal): Promise<CategoriesResponse> {
    const data = await fetchJson<CategoriesResponse>("/api/categories", { signal });

    return {
        ok: Boolean(data.ok),
        categories: Array.isArray(data.categories) ? data.categories : []
    };
}
