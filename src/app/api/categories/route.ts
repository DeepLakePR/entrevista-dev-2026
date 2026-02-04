import { getCategories } from "@/src/lib/server/products";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = getCategories();

    return new NextResponse(
        JSON.stringify({
            categories,
            ok: true
        }),
        { status: 200, statusText: "Ok" }
    );
}
