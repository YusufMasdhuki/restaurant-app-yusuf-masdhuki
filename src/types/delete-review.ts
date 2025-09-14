// Success response
export interface DeleteReviewSuccessResponse {
  success: true;
  message: string; // "Review deleted successfully"
}

// Error response
export interface DeleteReviewErrorResponse {
  success: false;
  message: string;
}
