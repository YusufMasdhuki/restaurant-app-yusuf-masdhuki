// Success response
export interface RemoveCartItemSuccessResponse {
  success: true;
  message: string; // "Item removed from cart successfully"
}

// Error response (401, 404, 500)
export interface RemoveCartItemErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
