"use client"

import ProductCard from "@/src/components/product/ProductCard";
import ProductGridSkeleton from "@/src/components/skeletons/ProductGridSkeleton";
import { useProducts } from "@/src/hooks/useProducts";

export default function Page() {

    const { products, isLoading } = useProducts();

    return <section>
        <div>


            <div className="flex flex-wrap p-4">
                {isLoading ? (
                    <ProductGridSkeleton />
                ) : (
                    products.map((p) =>
                        <ProductCard
                            product={p}
                            key={p.id}
                        />
                    )
                )}
            </div>
        </div>
    </section>
}
