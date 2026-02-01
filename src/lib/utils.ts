import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: unknown): string {

    if (typeof price !== "number" || !Number.isFinite(price)) {
        return "Invalid Price";
    }

    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
