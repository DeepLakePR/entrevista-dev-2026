import { formatPrice } from "@/src/lib/utils";
import { HeartIcon, ShoppingCart } from "lucide-react";
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

interface ProductCardProps {
    id: number,
    name: string,
    price: number,
    image?: string,
    category?: string,
}

export default function ProductCard({
    id,
    name,
    price,
    image,
    category
}: ProductCardProps) {

    return <div className="rounded-xl p-4 w-full sm:w-1/2 lg:w-1/3">
        <Link href={`/products/${id}`} title={"Comprar Agora " + name}>
            <Card className="relative mx-auto w-full pt-0">
                <div className="mx-auto p-4 pb-0">
                    <Image
                        src={image ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1280px-No-Image-Placeholder.svg.png"}
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
                        <Button variant="secondary">
                            <HeartIcon />
                        </Button>
                    </CardAction>

                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                        {category}

                        <p className="text-2xl text-foreground font-bold">{formatPrice(price)}</p>
                    </CardDescription>
                </CardHeader>

                <CardFooter className="justify-between gap-2">
                    <Button className="w-3/4">
                        Comprar
                    </Button>
                    <Button className="w-1/4">
                        <ShoppingCart />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    </div>
}
