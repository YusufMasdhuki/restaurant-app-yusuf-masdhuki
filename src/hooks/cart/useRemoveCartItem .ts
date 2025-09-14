import { removeCartItem } from '@/services/cart/service';
import type {
  RemoveCartItemErrorResponse,
  RemoveCartItemSuccessResponse,
} from '@/types/remove-cart-item-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    RemoveCartItemSuccessResponse, // success type
    AxiosError<RemoveCartItemErrorResponse>, // error type
    number // payload (id)
  >({
    mutationFn: (id) => removeCartItem(id),
    onSuccess: () => {
      // refresh cart setelah item dihapus
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
