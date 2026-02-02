import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { formatPrice } from "@/src/lib/utils";
import { useCart } from "@/src/context/CartContext";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    maxQuantity: number;
}

export default function CartItem(item: CartItemProps) {

    const { increment, decrement } = useCart();

    if (!item.id)
        return <p>Item Not Found</p>

    return <div className="flex py-4 items-center">
        <Image
            src={item.image ?? PRODUCT_IMAGE_PLACEHOLDER}
            width={64}
            height={64}
            alt={item.name}
            title={item.name}
            className="rounded-lg object-cover size-16"
        />

        <div className="px-4 flex-col flex lg:flex-row lg:justify-between w-full">
            <div>
                <Link href={`/products/${item.id}/`} title={item.name}>
                    {item.name}
                </Link>

                <p className="font-bold">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center justify-start lg:justify-center gap-x-1">
                <Button variant="ghost" size="icon-sm"
                onClick={() => decrement(item.id)}>
                    <MinusCircle />
                </Button>

                {item.quantity}

                <Button variant="ghost" size="icon-sm"
                onClick={() => increment(item.id)}>
                    <PlusCircle />
                </Button>
            </div>
        </div>
    </div>
}
