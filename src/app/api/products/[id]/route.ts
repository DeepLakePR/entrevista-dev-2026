import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/src/lib/server/products";

interface ProductParams {
    id: string
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
