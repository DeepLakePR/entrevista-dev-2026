import type { CartItem } from "@/src/types/CartItem";
import type { Product } from "@/src/types/Product";

export type CartActionResult = {
  added: boolean;
  reason?: "stock_limit";
};

export type CartToggleResult = {
  added: boolean;
  removed: boolean;
  reason?: "stock_limit";
};

type CartMutationResult<T> = {
  nextItems: CartItem[];
  result: T;
};

function createCartItem(product: Product): CartItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    stock: product.stock,
    quantity: 1,
  };
}

export function addProductToCart(
  items: CartItem[],
  product: Product
): CartMutationResult<CartActionResult> {
  const existingItem = items.find((item) => item.id === product.id);

  if (!existingItem) {
    if (product.stock <= 0) {
      return { nextItems: items, result: { added: false, reason: "stock_limit" } };
    }

    return {
      nextItems: [...items, createCartItem(product)],
      result: { added: true },
    };
  }

  if (existingItem.quantity >= existingItem.stock) {
    return { nextItems: items, result: { added: false, reason: "stock_limit" } };
  }

  const nextItems = items.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  );

  return { nextItems, result: { added: true } };
}

export function toggleProductInCart(
  items: CartItem[],
  product: Product
): CartMutationResult<CartToggleResult> {
  const existingItem = items.find((item) => item.id === product.id);

  if (existingItem) {
    return {
      nextItems: items.filter((item) => item.id !== product.id),
      result: { added: false, removed: true },
    };
  }

  if (product.stock <= 0) {
    return {
      nextItems: items,
      result: { added: false, removed: false, reason: "stock_limit" },
    };
  }

  return {
    nextItems: [...items, createCartItem(product)],
    result: { added: true, removed: false },
  };
}

export function incrementCartItemQuantity(
  items: CartItem[],
  id: number
): CartMutationResult<CartActionResult> {
  let added = false;
  let reason: CartActionResult["reason"];

  const nextItems = items.map((item) => {
    if (item.id !== id) return item;
    if (item.quantity >= item.stock) {
      reason = "stock_limit";
      return item;
    }

    added = true;
    return { ...item, quantity: item.quantity + 1 };
  });

  return { nextItems, result: { added, reason } };
}

export function decrementCartItemQuantity(items: CartItem[], id: number): CartItem[] {
  return items
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0);
}

export function calculateCartTotals(items: CartItem[]) {
  return items.reduce(
    (totals, item) => {
      totals.totalItems += item.quantity;
      totals.totalPrice += item.quantity * item.price;
      return totals;
    },
    { totalItems: 0, totalPrice: 0 }
  );
}
