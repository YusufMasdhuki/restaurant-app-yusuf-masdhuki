import type {
  CheckoutErrorResponse,
  CheckoutRequest,
  CheckoutSuccessResponse,
} from '@/types/checkout-type';
import type { AxiosError } from 'axios';
import { api } from '../api';
import type {
  MyOrderErrorResponse,
  MyOrderSuccessResponse,
} from '@/types/order-type';
import type {
  UpdateOrderStatusErrorResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusSuccessResponse,
} from '@/types/order-status-type';

// fungsi checkout
export const checkoutOrder = async (
  payload: CheckoutRequest
): Promise<CheckoutSuccessResponse> => {
  try {
    const { data } = await api.post<CheckoutSuccessResponse>(
      '/api/order/checkout',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<CheckoutErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as CheckoutErrorResponse;
  }
};

export const getMyOrders = async (params?: {
  status?: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
  page?: number;
  limit?: number;
}): Promise<MyOrderSuccessResponse> => {
  try {
    const { data } = await api.get<MyOrderSuccessResponse>(
      '/api/order/my-order',
      {
        params,
      }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<MyOrderErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as MyOrderErrorResponse;
  }
};

export const updateOrderStatus = async (
  id: number,
  payload: UpdateOrderStatusRequest
): Promise<UpdateOrderStatusSuccessResponse> => {
  try {
    const { data } = await api.put<UpdateOrderStatusSuccessResponse>(
      `/api/order/${id}/status`,
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<UpdateOrderStatusErrorResponse>;
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    } as UpdateOrderStatusErrorResponse;
  }
};
