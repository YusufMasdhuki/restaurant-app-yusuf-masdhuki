import { updateCartItem } from '@/services/cart/service';
import type {
  UpdateCartItemErrorResponse,
  UpdateCartItemRequest,
  UpdateCartItemSuccessResponse,
} from '@/types/update-cart-item-type';
import type { CartResponse } from '@/types/cart-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UpdateCartItemPayload = {
  id: number;
  payload: UpdateCartItemRequest;
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCartItemSuccessResponse,
    AxiosError<UpdateCartItemErrorResponse>,
    UpdateCartItemPayload,
    { previousCart?: CartResponse } // ✅ context type
  >({
    mutationFn: ({ id, payload }) => updateCartItem(id, payload),

    // Optimistic update
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<CartResponse>(['cart']);

      queryClient.setQueryData<CartResponse>(['cart'], (old) => {
        if (!old?.data?.cart) return old;

        const newCart: CartResponse = structuredClone(old);

        for (const group of newCart.data.cart) {
          const item = group.items.find((i) => i.id === id);
          if (item) {
            item.quantity = payload.quantity;
            item.itemTotal = item.menu.price * payload.quantity;
            group.subtotal = group.items.reduce(
              (sum, i) => sum + i.itemTotal,
              0
            );
          }
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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
