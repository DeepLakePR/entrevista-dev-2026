import { Product } from "@/src/types/Product";
import { NextRequest, NextResponse } from "next/server";
import products from "@/src/lib/server/products";

interface ProductParams {
    id: string
}

function getProductById(id: number): Product | null {

    if (!id) return null;

    const product: Product = products.find((p: Product) => p.id === id)

    return product ?? null;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<ProductParams> }
) {

    const { id } = await params;
    const product = getProductById(Number(id));

    return new NextResponse(
        JSON.stringify({
            product: product ?? [],
            ok: product ? true : false
        }),
        {
            status: product ? 200 : 404,
            statusText: product ? "Ok" : "Not Found"
        }
    );
}
