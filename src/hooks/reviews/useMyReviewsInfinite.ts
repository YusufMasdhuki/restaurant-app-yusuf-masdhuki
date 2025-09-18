import { getMyReviews } from '@/services/reviews/service';
import type {
  GetMyReviewsErrorResponse,
  GetMyReviewsQuery,
  GetMyReviewsSuccessResponse,
} from '@/types/get-my-review';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMyReviewsInfinite = (
  params?: Omit<GetMyReviewsQuery, 'page'>
) => {
  return useInfiniteQuery<
    GetMyReviewsSuccessResponse, // TQueryFnData
    AxiosError<GetMyReviewsErrorResponse>, // TError
    GetMyReviewsSuccessResponse, // TData
    ['my-reviews-infinite', typeof params], // TQueryKey
    number // TPageParam
  >({
    queryKey: ['my-reviews-infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      getMyReviews({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
