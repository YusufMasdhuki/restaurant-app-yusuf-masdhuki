import { updateOrderStatus } from '@/services/orders/service';
import type {
  UpdateOrderStatusErrorResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusSuccessResponse,
} from '@/types/order-status-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateOrderStatusSuccessResponse, // success response
    AxiosError<UpdateOrderStatusErrorResponse>, // error type
    { id: number; payload: UpdateOrderStatusRequest } // variables
  >({
    mutationFn: ({ id, payload }) => updateOrderStatus(id, payload),
    onSuccess: () => {
      // ✅ invalidate data orders biar langsung refresh
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
};
