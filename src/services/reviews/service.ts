import type {
  CreateReviewErrorResponse,
  CreateReviewRequest,
  CreateReviewResponse,
} from '@/types/review.interface';
import type { AxiosError } from 'axios';
import { api } from '../api';
import type {
  GetMyReviewsErrorResponse,
  GetMyReviewsQuery,
  GetMyReviewsSuccessResponse,
} from '@/types/get-my-review';
import type {
  GetRestaurantReviewsErrorResponse,
  GetRestaurantReviewsQuery,
  GetRestaurantReviewsSuccessResponse,
} from '@/types/get-restaurant-reviews';
import type {
  UpdateReviewErrorResponse,
  UpdateReviewRequest,
  UpdateReviewSuccessResponse,
} from '@/types/update-review';
import type {
  DeleteReviewErrorResponse,
  DeleteReviewSuccessResponse,
} from '@/types/delete-review';

export const createReview = async (
  payload: CreateReviewRequest
): Promise<CreateReviewResponse> => {
  try {
    const { data } = await api.post<CreateReviewResponse>(
      '/api/review',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<CreateReviewErrorResponse>;
    if (error.response?.data) {
      throw error.response.data; // lempar response API asli
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as CreateReviewErrorResponse;
  }
};

export const getRestaurantReviews = async (
  restaurantId: number,
  params?: GetRestaurantReviewsQuery
): Promise<GetRestaurantReviewsSuccessResponse> => {
  try {
    const { data } = await api.get<GetRestaurantReviewsSuccessResponse>(
      `/api/review/restaurant/${restaurantId}`,
      { params }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<GetRestaurantReviewsErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as GetRestaurantReviewsErrorResponse;
  }
};

export const getMyReviews = async (
  params?: GetMyReviewsQuery
): Promise<GetMyReviewsSuccessResponse> => {
  try {
    const { data } = await api.get<GetMyReviewsSuccessResponse>(
      '/api/review/my-reviews',
      { params }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<GetMyReviewsErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as GetMyReviewsErrorResponse;
  }
};

export const updateReview = async (
  id: number,
  payload: UpdateReviewRequest
): Promise<UpdateReviewSuccessResponse> => {
  try {
    const { data } = await api.put<UpdateReviewSuccessResponse>(
      `/api/review/${id}`,
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<UpdateReviewErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as UpdateReviewErrorResponse;
  }
};

export const deleteReview = async (
  id: number
): Promise<DeleteReviewSuccessResponse> => {
  try {
    const { data } = await api.delete<DeleteReviewSuccessResponse>(
      `/api/review/${id}`
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<DeleteReviewErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as DeleteReviewErrorResponse;
  }
};
