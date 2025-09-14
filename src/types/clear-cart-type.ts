// Success response
export interface ClearCartSuccessResponse {
  success: true;
  message: string; // "Cart cleared successfully"
}

// Error response (401, 500)
export interface ClearCartErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
