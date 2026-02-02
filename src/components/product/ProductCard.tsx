import { cn, formatPrice } from "@/src/lib/utils";
import { Check, HeartIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { useCart } from "@/src/context/CartContext";
import { useFavorites } from "@/src/context/FavoritesContext";
import { Product } from "@/src/types/Product";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({
    product
}: ProductCardProps) {

    const { addItem, isInCart, toggleItem } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const {
        id,
        name,
        price,
        image,
        category,
    } = product;

    const favorited = isFavorite(id);
    const inCart = isInCart(id);

    return <div className="rounded-xl p-4 w-full sm:w-1/2 lg:w-1/3">
        <Link href={`/products/${id}`} title={"Comprar Agora " + name}>
            <Card className="relative mx-auto w-full pt-0">
                <div className="mx-auto p-4 pb-0">
                    <Image
                        src={image ?? PRODUCT_IMAGE_PLACEHOLDER}
                        height={400}
                        width={400}
                        alt={"Product " + name}
                        title={name}
                        loading="eager"
                        className="rounded-xl object-cover"
                    />
                </div>
                <CardHeader>
                    <CardAction>
                        <Button
                            variant="secondary"
                            aria-pressed={favorited}
                            title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                            className={cn(
                                "transition-colors",
                                favorited ? "text-red-500 hover:text-red-600" : "text-muted-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(product);
                            }}
                        >
                            <HeartIcon fill={favorited ? "currentColor" : "none"} />
                        </Button>
                    </CardAction>

                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                        {category}

                        <p className="text-2xl text-foreground font-bold">{formatPrice(price)}</p>
                    </CardDescription>
                </CardHeader>

                <CardFooter className="justify-between gap-2">
                    <Button className="w-3/4" onClick={(e) => {
                        e.preventDefault();
                        addItem(product, { openDrawer: true })
                    }}>
                        Comprar
                    </Button>
                    <Button
                        className={cn(
                            "w-1/4 transition-colors",
                            inCart ? "bg-emerald-600 text-white hover:bg-emerald-600/90" : ""
                        )}
                        aria-pressed={inCart}
                        title={inCart ? "Remover do carrinho" : "Adicionar ao carrinho"}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleItem(product);
                        }}
                    >
                        {inCart ? <Check /> : <ShoppingCart />}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    </div>
}
