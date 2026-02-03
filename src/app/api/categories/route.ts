import products from "@/src/lib/server/products";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = Array.from(
        new Set(
            products
                .map((product) => product.category)
                .filter((category): category is string => Boolean(category && category.trim()))
        )
    ).sort((a, b) => a.localeCompare(b, "pt-BR"));

    return new NextResponse(
        JSON.stringify({
            categories,
            ok: true
        }),
        { status: 200, statusText: "Ok" }
    );
}
