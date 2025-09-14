import { updateOrderStatus } from '@/services/orders/service';
import type {
  UpdateOrderStatusErrorResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusSuccessResponse,
} from '@/types/order-status-type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateOrderStatus = () => {
  return useMutation<
    UpdateOrderStatusSuccessResponse, // success response
    AxiosError<UpdateOrderStatusErrorResponse>, // error type
    { id: number; payload: UpdateOrderStatusRequest } // variables
  >({
    mutationFn: ({ id, payload }) => updateOrderStatus(id, payload),
  });
};
