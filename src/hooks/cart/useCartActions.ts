import { useAddToCart } from './useAddToCart ';
import { useCartQuantity } from './useCartQuantity';

export const useCartActions = () => {
  const addToCartMutation = useAddToCart();
  const { increase, decrease } = useCartQuantity({ initialGroups: [] });

  const add = (restaurantId: number, menuId: number) => {
    increase(menuId);
    addToCartMutation.mutate({ restaurantId, menuId, quantity: 1 });
  };

  return { add, increase, decrease, isAdding: addToCartMutation.isPending };
};
