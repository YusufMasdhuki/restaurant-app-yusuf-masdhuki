// Koordinat resto
export interface Coordinates {
  lat: number;
  long: number;
}

// Query params opsional untuk limit menu & review
export interface GetRestoDetailQuery {
  limitMenu?: number;
  limitReview?: number;
}

// Menu di restoran
export interface RestoMenu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

// User yang mereview
export interface ReviewUser {
  id: number;
  name: string;
}

// Review restoran
export interface RestoReview {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
}

// Detail restoran
export interface RestoDetail {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: Coordinates;
  logo: string;
  images: string[];
  totalMenus: number;
  totalReviews: number;
  menus: RestoMenu[];
  reviews: RestoReview[];
}

// Response sukses
export interface GetRestoDetailSuccessResponse {
  success: true;
  data: RestoDetail;
}

// Response error
export interface GetRestoDetailErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
