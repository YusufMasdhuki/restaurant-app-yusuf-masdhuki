import { checkoutOrder } from '@/services/orders/service';
import type {
  CheckoutErrorResponse,
  CheckoutRequest,
  CheckoutSuccessResponse,
} from '@/types/checkout-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCheckoutOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CheckoutSuccessResponse, // success type
    AxiosError<CheckoutErrorResponse>, // error type
    CheckoutRequest // payload type
  >({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      // setelah checkout, cart biasanya kosong → refresh cache
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // bisa juga invalidate riwayat order kalau ada
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
