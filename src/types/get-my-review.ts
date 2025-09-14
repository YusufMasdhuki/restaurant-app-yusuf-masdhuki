// Query params
export interface GetMyReviewsQuery {
  page?: number;
  limit?: number;
}

// Success response
export interface GetMyReviewsSuccessResponse {
  success: true;
  data: {
    reviews: {
      id: number;
      star: number;
      comment: string;
      createdAt: string;
      restaurant: {
        id: number;
        name: string;
        logo: string;
      };
    }[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Error response
export interface GetMyReviewsErrorResponse {
  success: false;
  message: string;
}
