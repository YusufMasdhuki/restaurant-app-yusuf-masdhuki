import { getRecommendedRestaurants } from '@/services/restaurants/service';
import type {
  GetRecommendedRestaurantsErrorResponse,
  GetRecommendedRestaurantsSuccessResponse,
} from '@/types/resto-recommended-type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRecommendedRestaurants = () => {
  return useQuery<
    GetRecommendedRestaurantsSuccessResponse, // success response
    AxiosError<GetRecommendedRestaurantsErrorResponse> // error type
  >({
    queryKey: ['recommended-restaurants'],
    queryFn: getRecommendedRestaurants,
  });
};
