"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useFavorites } from "@/src/context/FavoritesContext";
import { useProducts } from "@/src/hooks/useProducts";
import { useCart } from "@/src/context/CartContext";
import { Button } from "@/src/components/ui/button";
import { cn, formatPrice } from "@/src/lib/utils";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";
import FavoritePageSkeleton from "@/src/components/skeletons/FavoritePageSkeleton";

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites();
    const { products, isLoading } = useProducts();
    const { addItem, isInCart } = useCart();

    const productsById = useMemo(
        () => new Map(products.map((product) => [product.id, product])),
        [products]
    );

    if(isLoading)
        return <FavoritePageSkeleton />

    if (favorites.length === 0) {
        return (
            <section className="p-4">
                <div className="mx-auto w-full max-w-3xl text-center space-y-3">
                    <h1 className="text-2xl font-semibold">Favoritos</h1>
                    <p className="text-muted-foreground">
                        Você ainda não favoritou nenhum produto.
                    </p>
                    <Button asChild>
                        <Link href="/">Ver produtos</Link>
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="p-4">
            <div className="mx-auto w-full max-w-6xl space-y-4">

                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Favoritos</h1>
                        <p className="text-muted-foreground text-sm">
                            {favorites.length} produto(s) salvos
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((favorite) => {
                        const product = productsById.get(favorite.id);
                        const inCart = product ? isInCart(product.id) : false;
                        const image = favorite.image ?? PRODUCT_IMAGE_PLACEHOLDER;
                        const canAddToCart = Boolean(product);

                        return (
                            <div
                                key={favorite.id}
                                className="rounded-xl border bg-card text-card-foreground p-3 flex flex-col gap-3"
                            >
                                <Link
                                    href={`/products/${favorite.id}`}
                                    className="block"
                                    title={`Ver produto ${favorite.name}`}
                                >
                                    <div className="rounded-lg overflow-hidden bg-muted">
                                        <Image
                                            src={image}
                                            width={400}
                                            height={400}
                                            alt={`Produto ${favorite.name}`}
                                            className="w-full h-auto object-cover aspect-square"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        <h3 className="font-semibold leading-snug">
                                            {favorite.name}
                                        </h3>
                                        <p className="text-lg font-bold">
                                            {formatPrice(favorite.price)}
                                        </p>
                                    </div>
                                </Link>

                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        className={cn(
                                            "flex-1 transition-colors",
                                            "text-red-500 hover:text-red-600"
                                        )}
                                        aria-pressed
                                        title="Remover dos favoritos"
                                        onClick={() => removeFavorite(favorite.id)}
                                    >
                                        Remover
                                    </Button>
                                    <Button
                                        className={cn(
                                            "flex-1",
                                            inCart ? "bg-emerald-600 text-white hover:bg-emerald-600/90" : ""
                                        )}
                                        disabled={!canAddToCart}
                                        title={
                                            canAddToCart
                                                ? "Adicionar ao carrinho"
                                                : "Produto indisponível"
                                        }
                                        onClick={() => {
                                            if (!product) return;
                                            addItem(product, { openDrawer: true });
                                        }}
                                    >
                                        {inCart ? <Check /> : <ShoppingCart />}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
