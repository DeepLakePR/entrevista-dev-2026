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
import { Button } from "@/src/components/ui/button";
import { HeartIcon, ShoppingCart } from "lucide-react";

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
            <div className="mb-6 flex items-center justify-between">
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

                <Button variant="secondary">
                    <HeartIcon />
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="mx-auto">
                    <Image
                        src={product.image ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1280px-No-Image-Placeholder.svg.png"}
                        width={400}
                        height={400}
                        alt={product.name}
                        title={product.name}
                        className="rounded-xl object-cover"
                    />
                </div>

                <div className="lg:px-8">
                    <h2 className="scroll-m-20 pb-2 mt-4 text-3xl font-medium tracking-tight">
                        {product.name}
                    </h2>

                    <div className="flex justify-between mb-4">
                        <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">
                            {formatPrice(product.price)}
                        </h3>

                        <Badge variant="destructive">
                            Restam {product.stock} Unidades
                        </Badge>
                    </div>

                    <div className="flex gap-2 lg:max-w-100">
                        <Button className="w-3/4">
                            Comprar Agora
                        </Button>
                        <Button className="w-1/4">
                            <ShoppingCart />
                        </Button>
                    </div>

                    <hr className="h-2 my-4" />

                    <p>
                        {product.description}
                    </p>

                    <hr className="h-2 my-2" />
                </div>
            </div>

        </div>
    </section>
}
