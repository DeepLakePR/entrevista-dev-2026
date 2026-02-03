import FavoritesPageClient from "@/src/components/pages/FavoritesPageClient";
import { buildMetadata } from "@/src/lib/seo";

export const metadata = buildMetadata({
  title: "Favoritos",
  description: "Gerencie seus produtos favoritos e adicione rapidamente ao carrinho.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
