"use client"

import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/types/product"
import { useEffect, useState } from "react"

interface ProductsFetchRes {
    ok: boolean,
    products: Product[]
}

export default function Page() {

    const [products, setProducts] = useState<Product[] | []>([]);

    useEffect(() => {

        (async function getProducts() {

            const apiRes = await fetch(`/api/products/`)
            const productsData = await apiRes.json();

            await setProducts(productsData.products);

            return true;
        })();

    }, []);

    return <section>
        <div>

            <div className="flex flex-wrap p-4">
                {products.map((p: Product) => 
                    <ProductCard 
                        id={p.id}
                        name={p.name}
                        price={p.price}
                        category={p.category}
                        image={p.image}
                        key={p.id}
                    />
                )}
            </div>
        </div>
    </section>
}
