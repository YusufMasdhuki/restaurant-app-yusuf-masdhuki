import { updateCartItem } from '@/services/cart/service';
import type {
  UpdateCartItemErrorResponse,
  UpdateCartItemRequest,
  UpdateCartItemSuccessResponse,
} from '@/types/update-cart-item-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UpdateCartItemPayload = {
  id: number;
  payload: UpdateCartItemRequest;
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCartItemSuccessResponse, // success type
    AxiosError<UpdateCartItemErrorResponse>, // error type
    UpdateCartItemPayload // payload type
  >({
    mutationFn: ({ id, payload }) => updateCartItem(id, payload),
    onSuccess: () => {
      // refresh cart setelah update
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
