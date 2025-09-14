import { getRestaurantReviews } from '@/services/reviews/service';
import type {
  GetRestaurantReviewsErrorResponse,
  GetRestaurantReviewsQuery,
  GetRestaurantReviewsSuccessResponse,
} from '@/types/get-restaurant-reviews';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRestaurantReviews = (
  restaurantId: number,
  params?: GetRestaurantReviewsQuery
) => {
  return useQuery<
    GetRestaurantReviewsSuccessResponse, // success
    AxiosError<GetRestaurantReviewsErrorResponse> // error
  >({
    queryKey: ['restaurant-reviews', restaurantId, params],
    queryFn: () => getRestaurantReviews(restaurantId, params),
    enabled: !!restaurantId, // jangan jalan kalau id kosong
  });
};
