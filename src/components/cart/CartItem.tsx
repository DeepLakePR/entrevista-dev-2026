import Image from "next/image";
import Link from "next/link";
import { MinusCircle, PlusCircle, X } from "lucide-react";

import { useCart } from "@/src/context/CartContext";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/src/lib/constants";
import { formatPrice } from "@/src/lib/utils";
import { Button } from "../ui/button";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  maxQuantity: number;
}

export default function CartItem(item: CartItemProps) {

  const { increment, decrement, removeItem } = useCart();

  if (!item.id) return <p>Item not found.</p>;

  const cannotDecrease = item.quantity <= 1;
  const cannotIncrease = item.quantity >= item.maxQuantity;

  return (
    <article className="flex items-center py-4" aria-label={`Item ${item.name}`}>
      <Image
        src={item.image ?? PRODUCT_IMAGE_PLACEHOLDER}
        width={64}
        height={64}
        alt={item.name}
        title={item.name}
        className="size-16 rounded-lg object-cover"
      />

      <div className="flex w-full flex-col px-4 lg:flex-row lg:justify-between">
        <div>
          <Link href={`/products/${item.id}/`} title={item.name}>
            {item.name}
          </Link>

          <p className="font-bold">{formatPrice(item.price)}</p>
        </div>

        <div className="flex justify-between lg:flex-col lg:justify-center lg:items-center">
          <div className="flex items-center justify-start gap-x-1 lg:justify-center">

            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Diminuir quantidade de ${item.name}`}
              disabled={cannotDecrease}
              onClick={() => decrement(item.id)}
            >
              <MinusCircle aria-hidden="true" />
            </Button>

            <output aria-live="polite" aria-label={`Quantidade: ${item.quantity}`}>
              {item.quantity}
            </output>

            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Aumentar quantidade de ${item.name}`}
              disabled={cannotIncrease}
              onClick={() => increment(item.id)}
            >
              <PlusCircle aria-hidden="true" />
            </Button>

          </div>

          <Button
            size="icon-sm"
            variant="ghost"
            aria-label={`Remover ${item.name}`}
            className="
            text-red-700
          "
            onClick={() => removeItem(item.id)}>
            <X aria-hidden="true" />
          </Button>
        </div>

      </div>
    </article>
  );
}
