"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCart } from "lucide-react";

import { useCart } from "@/src/context/CartContext";
import { Button } from "../ui/button";

export default function Header() {

  const { setDrawerOpen, totalItems } = useCart();

  return (
    <header className="border-b-1">
      <div className="flex justify-between p-4 text-white lg:px-8">

        <Link href="/" title="Uncode Commerce" aria-label="Ir para a pagina inicial">
          <Image
            src="/logo.png"
            width={64}
            height={64}
            alt="Logo da Uncode Commerce"
            className="aspect-square object-cover"
            priority
          />
        </Link>

        <nav className="flex gap-2" aria-label="Acoes principais">
          <Button
            size="lg"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Abrir carrinho com ${totalItems} item(ns)`}
            data-test-id="cart-handler"
          >
            <ShoppingCart aria-hidden="true" />
            <span aria-live="polite" aria-atomic="true">
              {totalItems}
            </span>
          </Button>

          <Button size="lg" asChild
          data-test-id="favorites-link">
            <Link href="/favorites" title="Favoritos" aria-label="Abrir pagina de favoritos">
              <HeartIcon fill="red" color="red" aria-hidden="true" />
              <span className="sr-only">Favoritos</span>
            </Link>
          </Button>
        </nav>
        
      </div>
    </header>
  );
}
