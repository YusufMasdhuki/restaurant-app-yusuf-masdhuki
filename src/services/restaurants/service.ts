import type {
  GetRestaurantsErrorResponse,
  GetRestaurantsQuery,
  GetRestaurantsSuccessResponse,
} from '@/types/resto-type';
import type { AxiosError } from 'axios';
import { api } from '../api';
import type {
  GetRecommendedRestaurantsErrorResponse,
  GetRecommendedRestaurantsSuccessResponse,
} from '@/types/resto-recommended-type';
import type {
  GetRestoDetailErrorResponse,
  GetRestoDetailQuery,
  GetRestoDetailSuccessResponse,
} from '@/types/resto-detail-type';

export const getRestaurants = async (
  params?: GetRestaurantsQuery
): Promise<GetRestaurantsSuccessResponse> => {
  try {
    const { data } = await api.get<GetRestaurantsSuccessResponse>(
      '/api/resto',
      {
        params,
      }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<GetRestaurantsErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as GetRestaurantsErrorResponse;
  }
};

export const getRecommendedRestaurants =
  async (): Promise<GetRecommendedRestaurantsSuccessResponse> => {
    try {
      const { data } = await api.get<GetRecommendedRestaurantsSuccessResponse>(
        '/api/resto/recommended'
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<GetRecommendedRestaurantsErrorResponse>;
      if (error.response?.data) {
        throw error.response.data;
      }
      throw {
        success: false,
        message: error.message || 'Network error',
      } as GetRecommendedRestaurantsErrorResponse;
    }
  };

export const getRestoDetail = async (
  id: number,
  params?: GetRestoDetailQuery
): Promise<GetRestoDetailSuccessResponse> => {
  try {
    const { data } = await api.get<GetRestoDetailSuccessResponse>(
      `/api/resto/${id}`,
      { params }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<GetRestoDetailErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as GetRestoDetailErrorResponse;
  }
};
