import { Button } from "@/src/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/src/components/ui/drawer"
import { ShoppingCart, X } from "lucide-react"
import CartItem from "./CartItem";

export default function CartDrawer() {

    const items = [
        {
            id: 1,
            name: "Camiseta Bacana",
            price: 25.90,
            image: "https://picsum.photos/seed/prod1/400/400",
            quantity: 5,
            stock: 15,
        },
        {
            id: 2,
            name: "Mochila",
            price: 128.90,
            image: "https://picsum.photos/seed/prod4/400/400",
            quantity: 1,
            stock: 15,
        },
        {
            id: 3,
            name: "Notebook",
            price: 99.90,
            image: "https://picsum.photos/seed/prod9/400/400",
            quantity: 11,
            stock: 15,
        },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            <Drawer
                direction="right"
                open={true}
            >
                <DrawerTrigger asChild>
                    <Button variant="outline" className="capitalize">
                        Right
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                    <DrawerHeader className="flex flex-row items-center justify-between border-b-1">
                        <DrawerClose asChild className="w-10">
                            <Button variant="outline">
                                <X />
                            </Button>
                        </DrawerClose>
                        <DrawerTitle className="flex gap-2 font-medium">
                            <ShoppingCart />
                            Meu Carrinho
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="no-scrollbar overflow-y-auto px-4">
                        {items.map((item, i) => 
                            <CartItem
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                maxQuantity={item.stock}
                                image={item.image}
                            />
                        )}
                    </div>
                    <DrawerFooter className="border-t-1 lg:flex-row lg:justify-between lg:items-center text-right lg:text-left">
                        <p>Total: <span className="font-bold">R$ 00,00</span></p>
                        <Button className="lg:w-40">Continuar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
