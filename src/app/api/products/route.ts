import type { Product } from "@/src/types/Product";
import products from "@/src/lib/server/products";
import { NextResponse } from "next/server";

export async function GET() {
    return new NextResponse(
        JSON.stringify({
            products: products as Product[],
            ok: true
        }),
        { status: 200, statusText: "Ok" }
    );
}
