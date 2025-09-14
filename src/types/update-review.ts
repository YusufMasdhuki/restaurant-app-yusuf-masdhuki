// Request body
export interface UpdateReviewRequest {
  star: number;
  comment: string;
}

// Success response
export interface UpdateReviewSuccessResponse {
  success: true;
  data: {
    review: {
      id: number;
      star: number;
      comment: string;
      updatedAt: string;
      restaurant: {
        id: number;
        name: string;
      };
    };
  };
}

// Error response
export interface UpdateReviewErrorResponse {
  success: false;
  message: string;
}
