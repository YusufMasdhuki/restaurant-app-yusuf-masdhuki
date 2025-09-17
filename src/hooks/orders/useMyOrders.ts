import { getMyOrders } from '@/services/orders/service';
import type {
  MyOrderErrorResponse,
  MyOrderSuccessResponse,
} from '@/types/order-type';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMyOrdersInfinite = (params?: {
  status?: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
  limit?: number;
}) => {
  return useInfiniteQuery<
    MyOrderSuccessResponse, // TQueryFnData (tiap page)
    AxiosError<MyOrderErrorResponse>, // TError
    InfiniteData<MyOrderSuccessResponse>, // TData (hasil akhir, biarin default juga bisa)
    [string, typeof params], // TQueryKey (tuple)
    number // TPageParam
  >({
    queryKey: ['myOrders', params],
    queryFn: ({ pageParam = 1 }) => getMyOrders({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    placeholderData: (prev) => prev,
  });
};
