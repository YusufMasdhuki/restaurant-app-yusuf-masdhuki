import { getCart } from '@/services/cart/service';
import type { CartErrorResponse, CartSuccessResponse } from '@/types/cart-type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCart = () => {
  return useQuery<CartSuccessResponse, AxiosError<CartErrorResponse>>({
    queryKey: ['cart'], // key unik untuk caching
    queryFn: getCart, // fungsi fetch dari API
    staleTime: 1000 * 60 * 5, // cache 5 menit (opsional)
    retry: 1, // coba ulang sekali kalau error
  });
};
