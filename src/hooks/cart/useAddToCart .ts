import { addToCart } from '@/services/cart/service';
import type {
  AddToCartErrorResponse,
  AddToCartRequest,
  AddToCartSuccessResponse,
} from '@/types/add-to-cart-type';
import type { CartItem, CartResponse } from '@/types/cart-type'; // ⬅️ tambahan
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddToCartSuccessResponse,
    AxiosError<AddToCartErrorResponse>,
    AddToCartRequest,
    { previousCart?: CartResponse } // ⬅️ context type
  >({
    mutationFn: addToCart,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<CartResponse>(['cart']);

      queryClient.setQueryData<CartResponse>(['cart'], (old) => {
        if (!old?.data?.cart) return old;

        const newCart: CartResponse = structuredClone(old);

        const group = newCart.data.cart.find(
          (g) => g.restaurant.id === variables.restaurantId
        );

        const tempItem: CartItem = {
          id: Date.now(),
          menu: {
            id: variables.menuId,
            foodName: '',
            price: 0,
            type: '',
            image: '',
          },
          quantity: variables.quantity,
          itemTotal: 0,
        };

        if (group) {
          group.items.push(tempItem);
        } else {
          newCart.data.cart.push({
            restaurant: {
              id: variables.restaurantId,
              name: '',
              logo: '',
            },
            items: [tempItem],
            subtotal: 0,
          });
        }

        return newCart;
      });

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
