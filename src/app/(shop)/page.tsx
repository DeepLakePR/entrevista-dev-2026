"use client"

import CartDrawer from "@/src/components/cart/CartDrawer";
import ProductCard from "@/src/components/product/ProductCard";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Product } from "@/src/types/product"
import { useEffect, useState } from "react"

interface ProductsFetchRes {
    ok: boolean,
    products: Product[]
}

export default function Page() {

    const [products, setProducts] = useState<Product[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        (async function getProducts() {

            try {
                const apiRes = await fetch(`/api/products/`)
                const productsData = await apiRes.json();
                setProducts(productsData.products ?? []);
            } finally {
                setIsLoading(false);
            }

            return true;
        })();

    }, []);

    return <section>
        <div>

            <CartDrawer />

            <div className="flex flex-wrap p-4">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div className="rounded-xl p-4 w-full sm:w-1/2 lg:w-1/3" key={`product-skeleton-${index}`}>
                            <div className="relative mx-auto w-full rounded-xl border bg-card p-4">
                                <Skeleton className="h-[240px] w-full rounded-xl" />
                                <div className="mt-4 space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-7 w-1/3" />
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Skeleton className="h-10 w-3/4" />
                                    <Skeleton className="h-10 w-1/4" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    products.map((p: Product) =>
                        <ProductCard
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            category={p.category}
                            image={p.image}
                            key={p.id}
                        />
                    )
                )}
            </div>
        </div>
    </section>
}
