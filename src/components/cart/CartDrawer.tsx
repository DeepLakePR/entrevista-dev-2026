"use client";

import { ShoppingCart, X } from "lucide-react";

import CartItem from "./CartItem";
import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import { useCart } from "@/src/context/CartContext";
import { formatPrice } from "@/src/lib/utils";

export default function CartDrawer() {
  
  const { items, isDrawerOpen, setDrawerOpen, totalPrice } = useCart();

  return (
    <div className="flex flex-wrap gap-2">
      <Drawer
        direction="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenChange={(open) => setDrawerOpen(open)}
      >
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader className="flex flex-row items-center justify-between border-b-1">

            <DrawerClose asChild className="w-10">
              <Button
                variant="outline"
                aria-label="Fechar painel do carrinho"
                onClick={() => setDrawerOpen(false)}
              >
                <X aria-hidden="true" />
              </Button>
            </DrawerClose>

            <DrawerTitle className="flex gap-2 font-medium">
              <ShoppingCart aria-hidden="true" />
              Meu carrinho
            </DrawerTitle>

          </DrawerHeader>

          <DrawerDescription className="sr-only">
            Painel lateral para revisar itens e finalizar compra.
          </DrawerDescription>

          <div className="no-scrollbar overflow-y-auto px-4">
            {items.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground" role="status">
                Seu carrinho esta vazio.
              </p>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  maxQuantity={item.stock}
                  image={item.image}
                />
              ))
            )}
          </div>

          <DrawerFooter className="border-t-1 text-right lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <p aria-live="polite">
              Total: <span className="font-bold">{formatPrice(totalPrice)}</span>
            </p>
            <Button className="lg:w-40" disabled={items.length === 0}>
              Continuar
            </Button>
          </DrawerFooter>

        </DrawerContent>
      </Drawer>

    </div>
  );
}
