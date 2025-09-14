// Request body untuk membuat review
export interface CreateReviewRequest {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
}

// Response sukses dari API
export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: {
    review: {
      id: number;
      star: number;
      comment: string;
      createdAt: string; // ISO date string
      user: {
        id: number;
        name: string;
      };
      restaurant: {
        id: number;
        name: string;
      };
    };
  };
}

// Response error dari API
export interface CreateReviewErrorResponse {
  success: boolean;
  message: string;
}
