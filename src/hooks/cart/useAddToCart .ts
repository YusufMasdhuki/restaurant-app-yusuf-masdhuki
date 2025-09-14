import { addToCart } from '@/services/cart/service';
import type {
  AddToCartErrorResponse,
  AddToCartRequest,
  AddToCartSuccessResponse,
} from '@/types/add-to-cart-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddToCartSuccessResponse,
    AxiosError<AddToCartErrorResponse>,
    AddToCartRequest
  >({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.response?.data.message ?? error.message);
    },
  });
};
