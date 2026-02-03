"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";

import { useFavorites } from "@/src/context/FavoritesContext";
import { useProducts } from "@/src/hooks/useProducts";
import { useCart } from "@/src/context/CartContext";
import { Button } from "@/src/components/ui/button";
import { cn, formatPrice } from "@/src/lib/utils";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";
import FavoritePageSkeleton from "@/src/components/skeletons/FavoritePageSkeleton";

export default function FavoritesPageClient() {
  const { favorites, removeFavorite } = useFavorites();
  const { products, isLoading } = useProducts();
  const { addItem, isInCart } = useCart();

  const productsById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  if (isLoading) return <FavoritePageSkeleton />;

  if (favorites.length === 0) {
    return (
      <section className="p-4" aria-labelledby="favorites-heading">

        <div className="mx-auto w-full max-w-3xl space-y-3 text-center">
          <h1 id="favorites-heading" className="text-2xl font-semibold">
            Favoritos
          </h1>

          <p className="text-muted-foreground">
            Voce ainda nao favoritou nenhum produto.
          </p>

          <Button asChild>
            <Link href="/" aria-label="Ver lista de produtos">
              Ver produtos
            </Link>
          </Button>

        </div>
      </section>
    );
  }

  return (
    <section className="p-4 px-8" aria-labelledby="favorites-heading">
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <div className="flex items-end justify-between gap-4">

          <div>

            <h1 id="favorites-heading" className="text-2xl font-semibold">
              Favoritos
            </h1>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {favorites.length} produto(s) salvos
            </p>

          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => {

            const product = productsById.get(favorite.id);
            const inCart = product ? isInCart(product.id) : false;
            const image = favorite.image ?? PRODUCT_IMAGE_PLACEHOLDER;
            const canAddToCart = Boolean(product);

            return (
              <li
                key={favorite.id}
                className="flex flex-col gap-3 rounded-xl border bg-card p-3 text-card-foreground"
              >
                <Link
                  href={`/products/${favorite.id}`}
                  className="block"
                  title={`Ver produto ${favorite.name}`}
                >

                  <div className="overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={image}
                      width={400}
                      height={400}
                      alt={`Produto ${favorite.name}`}
                      className="aspect-square h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-3 space-y-1">
                    <h2 className="font-semibold leading-snug">{favorite.name}</h2>
                    <p className="text-lg font-bold">{formatPrice(favorite.price)}</p>
                  </div>

                </Link>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className={cn(
                      "flex-1 text-red-500 transition-colors hover:text-red-600"
                    )}
                    aria-label={`Remover ${favorite.name} dos favoritos`}
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
                    aria-label={
                      canAddToCart
                        ? `Adicionar ${favorite.name} ao carrinho`
                        : `Produto ${favorite.name} indisponivel`
                    }
                    onClick={() => {
                      if (!product) return;
                      addItem(product, { openDrawer: true });
                    }}
                  >

                    {inCart ? (
                      <Check aria-hidden="true" />
                    ) : (
                      <ShoppingCart aria-hidden="true" />
                    )}

                    <span className="sr-only">
                      {inCart ? "No carrinho" : "Adicionar ao carrinho"}
                    </span>

                  </Button>

                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
