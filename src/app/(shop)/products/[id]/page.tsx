"use client"

import { Badge } from "@/src/components/ui/badge";
import { formatPrice, cn } from "@/src/lib/utils";
import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Check, HeartIcon, ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useFavorites } from "@/src/context/FavoritesContext";
import ProductDetailsSkeleton from "@/src/components/skeletons/ProductDetailsSkeleton";
import { useProduct } from "@/src/hooks/useProduct";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";

interface ProductParams {
    id: number;
}

export default function ProductPage({
    params,
}: {
    params: Promise<ProductParams>
}) {

    const { addItem, isInCart, toggleItem } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { product, isLoading } = useProduct(params);

    if (isLoading || !product) {
        return <ProductDetailsSkeleton />
    }

    const favorited = isFavorite(product.id);
    const inCart = isInCart(product.id);

    return <>
        <section className="w-full min-h-[80vh]">
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
                                <BreadcrumbPage>Id: {product.id}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Button
                        variant="secondary"
                        aria-pressed={favorited}
                        title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        className={cn(
                            "transition-colors",
                            favorited ? "text-red-500 hover:text-red-600" : "text-muted-foreground"
                        )}
                        onClick={() => toggleFavorite(product)}
                    >
                        <HeartIcon fill={favorited ? "currentColor" : "none"} />
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="mx-auto lg:max-w-1/3">
                        <Image
                            src={product.image ?? PRODUCT_IMAGE_PLACEHOLDER}
                            width={400}
                            height={400}
                            alt={product.name}
                            title={product.name}
                            className="rounded-xl object-cover"
                        />
                    </div>

                    <div className="lg:px-8 lg:w-2/3">
                        <h2 className="scroll-m-20 pb-2 mt-4 text-3xl font-medium tracking-tight">
                            {product.name}
                        </h2>

                        <div className="flex justify-between mb-4 mt-2">
                            <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">
                                {formatPrice(product.price)}
                            </h3>

                            <Badge variant="destructive">
                                Restam {product.stock} Unidades
                            </Badge>
                        </div>

                        <div className="flex gap-2 lg:max-w-full pr-2 mb-6">
                            <Button className="w-3/4"
                                onClick={() => addItem(product, { openDrawer: true })}>
                                Comprar Agora
                            </Button>
                            <Button
                                className={cn(
                                    "w-1/4 transition-colors",
                                    inCart ? "bg-emerald-600 text-white hover:bg-emerald-600/90" : ""
                                )}
                                aria-pressed={inCart}
                                title={inCart ? "Remover do carrinho" : "Adicionar ao carrinho"}
                                onClick={() => toggleItem(product)}
                            >
                                {inCart ? <Check /> : <ShoppingCart />}
                            </Button>
                        </div>

                        <p>
                            {product.description}
                        </p>
                    </div>
                </div>

            </div>
        </section>
        
        <hr className="h-2 my-2" />
    </>
}
