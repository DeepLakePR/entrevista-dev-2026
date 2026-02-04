import type { FavoriteItem } from "@/src/types/FavoriteItem";
import type { Product } from "@/src/types/Product";

function createFavoriteItem(product: Product): FavoriteItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
  };
}

export function toggleFavoriteProduct(
  favorites: FavoriteItem[],
  product: Product
): FavoriteItem[] {
  const alreadyFavorited = favorites.some((favorite) => favorite.id === product.id);

  if (alreadyFavorited) {
    return favorites.filter((favorite) => favorite.id !== product.id);
  }

  return [...favorites, createFavoriteItem(product)];
}
