import CartDrawer from "@/src/components/cart/CartDrawer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        {children}
        <CartDrawer />
        </>
    )
}
