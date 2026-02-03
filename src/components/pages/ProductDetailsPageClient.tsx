"use client";

import Image from "next/image";
import { Check, HeartIcon, ShoppingCart } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { useCart } from "@/src/context/CartContext";
import { useFavorites } from "@/src/context/FavoritesContext";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";
import { cn, formatPrice } from "@/src/lib/utils";
import type { Product } from "@/src/types/Product";

interface ProductDetailsPageClientProps {
  product: Product;
}

export default function ProductDetailsPageClient({
  product,
}: ProductDetailsPageClientProps) {
  
  const { addItem, isInCart, toggleItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorited = isFavorite(product.id);
  const inCart = isInCart(product.id);

  return (
    <>
      <section className="min-h-[80vh] w-full" aria-labelledby="product-name">
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <Breadcrumb>

              <BreadcrumbList>

                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Produtos</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href={`/?category=${product.category}`}>
                    {product.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>

            </Breadcrumb>

            <Button
              variant="secondary"
              aria-pressed={favorited}
              aria-label={
                favorited
                  ? `Remover ${product.name} dos favoritos`
                  : `Adicionar ${product.name} aos favoritos`
              }
              className={cn(
                "transition-colors",
                favorited
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground"
              )}
              onClick={() => toggleFavorite(product)}
            >
              <HeartIcon
                aria-hidden="true"
                fill={favorited ? "currentColor" : "none"}
              />
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
                priority
              />
            </div>

            <div className="lg:w-2/3 lg:px-8">
              <h1
                id="product-name"
                className="mt-4 scroll-m-20 pb-2 text-3xl font-medium tracking-tight"
              >
                {product.name}
              </h1>

              <div className="mb-4 mt-2 flex justify-between">
                <p className="scroll-m-20 text-3xl font-bold tracking-tight">
                  {formatPrice(product.price)}
                </p>

                <Badge variant="destructive" aria-live="polite">
                  Restam {product.stock} unidades
                </Badge>
              </div>

              <div className="mb-6 flex gap-2 pr-2 lg:max-w-full">
                <Button
                  className="w-3/4"
                  aria-label={`Comprar ${product.name} agora`}
                  onClick={() => addItem(product, { openDrawer: true })}
                >
                  Comprar agora
                </Button>
                <Button
                  className={cn(
                    "w-1/4 transition-colors",
                    inCart ? "bg-emerald-600 text-white hover:bg-emerald-600/90" : ""
                  )}
                  aria-pressed={inCart}
                  aria-label={
                    inCart
                      ? `Remover ${product.name} do carrinho`
                      : `Adicionar ${product.name} ao carrinho`
                  }
                  onClick={() => toggleItem(product)}
                >
                  {inCart ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <ShoppingCart aria-hidden="true" />
                  )}
                </Button>
              </div>

              <p>{product.description}</p>
            </div>

          </div>
        </div>

      </section>

      <hr className="my-2 h-2" />
    </>
  );
}
