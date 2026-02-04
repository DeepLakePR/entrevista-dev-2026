import Image from "next/image";
import Link from "next/link";
import { Check, HeartIcon, ShoppingCart } from "lucide-react";

import { useCart } from "@/src/context/CartContext";
import { useFavorites } from "@/src/context/FavoritesContext";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";
import { cn, formatPrice } from "@/src/lib/utils";
import { Product } from "@/src/types/Product";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart, toggleItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { id, name, price, image, category } = product;

  const favorited = isFavorite(id);
  const inCart = isInCart(id);

  return (
    <article className="w-full rounded-xl p-4 sm:w-1/2 lg:w-1/3">

      <Link href={`/products/${id}`} title={`Ver detalhes de ${name}`}
        data-test-id={`product-card-${product.id}`}>

        <Card className="relative mx-auto w-full pt-0">
          <div className="mx-auto p-4 pb-0">
            <Image
              src={image ?? PRODUCT_IMAGE_PLACEHOLDER}
              height={400}
              width={400}
              alt={`Produto ${name}`}
              title={name}
              loading="lazy"
              className="rounded-xl object-cover"
            />
          </div>

          <CardHeader>
            <CardAction>
              <Button
                variant="secondary"
                aria-pressed={favorited}
                aria-label={
                  favorited
                    ? `Remover ${name} dos favoritos`
                    : `Adicionar ${name} aos favoritos`
                }
                className={cn(
                  "transition-colors",
                  favorited ? "text-red-500 hover:text-red-600" : "text-muted-foreground"
                )}
                onClick={(event) => {
                  event.preventDefault();
                  toggleFavorite(product);
                }}
                data-test-id={`product-card-favorite-${product.id}`}
              >
                <HeartIcon fill={favorited ? "currentColor" : "none"} aria-hidden="true" />
              </Button>
            </CardAction>

            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {category}

              <p className="text-2xl font-bold text-foreground">{formatPrice(price)}</p>
            </CardDescription>
          </CardHeader>

          <CardFooter className="justify-between gap-2">
            <Button
              className="w-3/4"
              aria-label={`Comprar ${name}`}
              onClick={(event) => {
                event.preventDefault();
                addItem(product, { openDrawer: true });
              }}
              data-test-id={`product-card-buy-${product.id}`}
            >
              Comprar
            </Button>

            <Button
              className={cn(
                "w-1/4 transition-colors",
                inCart ? "bg-emerald-600 text-white hover:bg-emerald-600/90" : ""
              )}
              aria-pressed={inCart}
              aria-label={
                inCart ? `Remover ${name} do carrinho` : `Adicionar ${name} ao carrinho`
              }
              onClick={(event) => {
                event.preventDefault();
                toggleItem(product);
              }}
              data-test-id={`product-card-cart-${product.id}`}
            >
              {inCart ? <Check aria-hidden="true" /> : <ShoppingCart aria-hidden="true" />}
              <span className="sr-only">{inCart ? "No carrinho" : "Adicionar ao carrinho"}</span>
            </Button>
          </CardFooter>
        </Card>

      </Link>

    </article>
  );
}
