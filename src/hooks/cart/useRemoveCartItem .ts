import { removeCartItem } from '@/services/cart/service';
import type {
  RemoveCartItemErrorResponse,
  RemoveCartItemSuccessResponse,
} from '@/types/remove-cart-item-type';
import type { CartResponse } from '@/types/cart-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    RemoveCartItemSuccessResponse,
    AxiosError<RemoveCartItemErrorResponse>,
    number, // payload = itemId
    { previousCart?: CartResponse } // context type
  >({
    mutationFn: (id) => removeCartItem(id),

    // Optimistic update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<CartResponse>(['cart']);

      queryClient.setQueryData<CartResponse>(['cart'], (old) => {
        if (!old?.data?.cart) return old;

        const newCart: CartResponse = structuredClone(old);

        for (const group of newCart.data.cart) {
          group.items = group.items.filter((i) => i.id !== id);
          group.subtotal = group.items.reduce((sum, i) => sum + i.itemTotal, 0);
        }

        // Hapus group yang kosong
        newCart.data.cart = newCart.data.cart.filter((g) => g.items.length > 0);

        return newCart;
      });

      return { previousCart };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
