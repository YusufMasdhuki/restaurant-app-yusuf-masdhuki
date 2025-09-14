import type { CartErrorResponse, CartSuccessResponse } from '@/types/cart-type';
import type { AxiosError } from 'axios';
import { api } from '../api';
import type {
  AddToCartErrorResponse,
  AddToCartRequest,
  AddToCartSuccessResponse,
} from '@/types/add-to-cart-type';
import type {
  ClearCartErrorResponse,
  ClearCartSuccessResponse,
} from '@/types/clear-cart-type';
import type {
  UpdateCartItemErrorResponse,
  UpdateCartItemRequest,
  UpdateCartItemSuccessResponse,
} from '@/types/update-cart-item-type';
import type {
  RemoveCartItemErrorResponse,
  RemoveCartItemSuccessResponse,
} from '@/types/remove-cart-item-type';

export const getCart = async (): Promise<CartSuccessResponse> => {
  try {
    const { data } = await api.get<CartSuccessResponse>('/api/cart');
    return data;
  } catch (err) {
    const error = err as AxiosError<CartErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as CartErrorResponse;
  }
};

// fungsi add to cart
export const addToCart = async (
  payload: AddToCartRequest
): Promise<AddToCartSuccessResponse> => {
  try {
    const { data } = await api.post<AddToCartSuccessResponse>(
      '/api/cart',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<AddToCartErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as AddToCartErrorResponse;
  }
};

// fungsi clear cart
export const clearCart = async (): Promise<ClearCartSuccessResponse> => {
  try {
    const { data } = await api.delete<ClearCartSuccessResponse>('/api/cart');
    return data;
  } catch (err) {
    const error = err as AxiosError<ClearCartErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as ClearCartErrorResponse;
  }
};

// fungsi update quantity cart item
export const updateCartItem = async (
  id: number,
  payload: UpdateCartItemRequest
): Promise<UpdateCartItemSuccessResponse> => {
  try {
    const { data } = await api.put<UpdateCartItemSuccessResponse>(
      `/api/cart/${id}`,
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<UpdateCartItemErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as UpdateCartItemErrorResponse;
  }
};

// fungsi hapus 1 item cart
export const removeCartItem = async (
  id: number
): Promise<RemoveCartItemSuccessResponse> => {
  try {
    const { data } = await api.delete<RemoveCartItemSuccessResponse>(
      `/api/cart/${id}`
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<RemoveCartItemErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as RemoveCartItemErrorResponse;
  }
};
