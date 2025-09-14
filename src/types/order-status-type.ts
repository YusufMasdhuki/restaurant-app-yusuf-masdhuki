// Request body untuk update status
export interface UpdateOrderStatusRequest {
  status: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
}

// Order singkat untuk response update
export interface UpdatedOrder {
  id: number;
  transactionId: string;
  status: string;
  updatedAt: string;
}

// Response success
export interface UpdateOrderStatusSuccessResponse {
  success: true;
  data: {
    order: UpdatedOrder;
  };
}

// Response error
export interface UpdateOrderStatusErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
