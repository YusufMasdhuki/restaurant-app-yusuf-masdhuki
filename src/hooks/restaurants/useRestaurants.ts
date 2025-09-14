// hooks/useInfiniteRestaurants.ts
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type {
  GetRestaurantsQuery,
  GetRestaurantsSuccessResponse,
  GetRestaurantsErrorResponse,
} from '@/types/resto-type';
import { getRestaurants } from '@/services/restaurants/service';

export const useInfiniteRestaurants = (
  params?: Omit<GetRestaurantsQuery, 'page'>
) => {
  return useInfiniteQuery<
    GetRestaurantsSuccessResponse, // response tiap page
    GetRestaurantsErrorResponse, // error
    InfiniteData<GetRestaurantsSuccessResponse>, // tipe data yang balik (punya .pages)
    [string, typeof params], // queryKey
    number // pageParam
  >({
    queryKey: ['restaurants-infinite', params],
    queryFn: ({ pageParam = 1 }) => {
      console.log('Fetching page', pageParam, 'with params', { ...params });
      return getRestaurants({ ...params, page: pageParam });
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
