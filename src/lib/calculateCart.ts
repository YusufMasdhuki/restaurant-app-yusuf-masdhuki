import type { CartSuccessResponse } from '@/types/cart-type';

const calculateCartByRestaurant = (
  cartData: CartSuccessResponse | undefined,
  restoId: number
) => {
  if (!cartData?.data.cart) return { totalItems: 0, totalPrice: 0 };

  const group = cartData.data.cart.find(
    (g) => g.restaurant.id === restoId // ✅ filter by restoId
  );

  if (!group) return { totalItems: 0, totalPrice: 0 };

  let totalItems = 0;
  let totalPrice = 0;

  for (const item of group.items) {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.menu.price;
  }

  return { totalItems, totalPrice };
};

export default calculateCartByRestaurant;
