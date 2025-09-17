import type { CartItem, CartSuccessResponse } from '@/types/cart-type';

interface HandleQuantityParams {
  item: CartItem;
  update: (id: number, payload: { quantity: number }) => void;
  remove: (id: number) => void;
  change: 'increase' | 'decrease';
}

/**
 * Handle increase/decrease/remove item quantity in cart
 */
export function handleCartItemQuantity({
  item,
  update,
  remove,
  change,
}: HandleQuantityParams) {
  if (change === 'increase') {
    update(item.id, { quantity: item.quantity + 1 });
  } else if (change === 'decrease') {
    if (item.quantity > 1) {
      update(item.id, { quantity: item.quantity - 1 });
    } else {
      remove(item.id);
    }
  }
}

export const findCartItem = (
  cartData: CartSuccessResponse | undefined,
  menuId: number
): CartItem | undefined => {
  if (!cartData?.data.cart) return undefined;

  for (const group of cartData.data.cart) {
    const found = group.items.find((item) => item.menu.id === menuId);
    if (found) return found;
  }

  return undefined;
};
