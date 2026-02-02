"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon, ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { cn } from "@/src/lib/utils";

export default function Header() {

    const { setDrawerOpen, totalItems } = useCart();
    const [isCartBumping, setIsCartBumping] = useState(false);
    const prevItemsRef = useRef(totalItems);

    useEffect(() => {

        async function cartIsBumping() {
            const previous = prevItemsRef.current;

            if (totalItems > previous) {
                setIsCartBumping(true);
                const timer = setTimeout(() => setIsCartBumping(false), 300);
                prevItemsRef.current = totalItems;
                return () => clearTimeout(timer);
            }

            prevItemsRef.current = totalItems;
        }
        
        cartIsBumping();

    }, [totalItems]);

    return <header className="border-b-1">
        <div className="text-white py-4 px-3 flex justify-between">
            <Link href="/" title="Uncode Commerce">
                <Image
                    src="/logo.png"
                    width={96}
                    height={96}
                    alt="Uncode Commerce Logo"
                    loading="lazy"
                    className="object-cover aspect-square"
                />
            </Link>

            <div className="flex gap-2">
                <Button size="lg" onClick={() => setDrawerOpen(true)}>
                    <ShoppingCart className={cn(isCartBumping && "animate-cart-pop")} />
                    {totalItems}
                </Button>
                <Button size="lg">
                    <HeartIcon fill="red" color="red" />
                </Button>
            </div>
        </div>
    </header>
}
