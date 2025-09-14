import { clearCart } from '@/services/cart/service';
import type {
  ClearCartErrorResponse,
  ClearCartSuccessResponse,
} from '@/types/clear-cart-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ClearCartSuccessResponse, // success type
    AxiosError<ClearCartErrorResponse>, // error type
    void // payload type (karena tidak perlu body)
  >({
    mutationFn: clearCart,
    onSuccess: () => {
      // invalidate supaya cart kosong di-refresh
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
