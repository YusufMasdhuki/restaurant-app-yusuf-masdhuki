import { getMyOrders } from '@/services/orders/service';
import type {
  MyOrderErrorResponse,
  MyOrderSuccessResponse,
} from '@/types/order-type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMyOrdersInfinite = (params?: {
  status?: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
  limit?: number;
}) => {
  return useInfiniteQuery<
    MyOrderSuccessResponse, // response success
    AxiosError<MyOrderErrorResponse>, // response error
    MyOrderSuccessResponse, // data type per page
    [_: string, typeof params], // queryKey type
    number // ✅ pageParam type (harus number)
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
