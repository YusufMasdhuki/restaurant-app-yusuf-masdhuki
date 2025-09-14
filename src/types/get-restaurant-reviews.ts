// Query params
export interface GetRestaurantReviewsQuery {
  page?: number;
  limit?: number;
  rating?: number;
}

// Success response
export interface GetRestaurantReviewsSuccessResponse {
  success: true;
  data: {
    restaurant: {
      id: number;
      name: string;
      star: number;
    };
    reviews: {
      id: number;
      star: number;
      comment: string;
      createdAt: string;
      user: {
        id: number;
        name: string;
      };
    }[];
    statistics: {
      totalReviews: number;
      averageRating: number;
      ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
      };
    };
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Error response
export interface GetRestaurantReviewsErrorResponse {
  success: false;
  message: string;
}
