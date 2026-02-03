import CartDrawer from "@/src/components/cart/CartDrawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main id="main-content">{children}</main>
      <CartDrawer />
    </>
  );
}
