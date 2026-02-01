"use client"

import { Badge } from "@/src/components/ui/badge";
import { formatPrice } from "@/src/lib/utils";
import { Product } from "@/src/types/product"
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";

interface ProductParams {
    id: number;
}

interface ProductResponseData {
    ok: boolean,
    product: Product
}

export default function ProductPage({
    params,
}: {
    params: Promise<ProductParams>
}) {

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        params.then(async (resolvedParams: ProductParams) => {

            const productRes = await fetch(`/api/products/${resolvedParams.id}`);
            const productData: ProductResponseData = await productRes.json();

            console.log(productData);

            if (productData.ok)
                setProduct(productData.product);

        });
    }, [params]);


    return <section className="w-full">
        <div className="p-8">
            <div className="mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Produtos</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">{product.category}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Código: {product.id}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div>
                <div>
                    <Image
                        src={product.image ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1280px-No-Image-Placeholder.svg.png"}
                        width={400}
                        height={400}
                        alt={product.name}
                        title={product.name}
                    />
                </div>

                <div>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        {product.name}
                    </h2>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {formatPrice(product.price)}
                    </h3>

                    <Badge variant="destructive">
                        Restam {product.stock}
                    </Badge>

                    <p>
                        {product.description}
                    </p>
                </div>
            </div>

        </div>
    </section>
}
