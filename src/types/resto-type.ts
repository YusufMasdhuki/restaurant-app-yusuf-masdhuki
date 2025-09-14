// Query params untuk pencarian resto
export interface GetRestaurantsQuery {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

// Struktur harga resto
export interface PriceRange {
  min: number;
  max: number;
}

// Data satu restoran
export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
  distance: number;
}

// Pagination meta
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Response sukses
export interface GetRestaurantsSuccessResponse {
  success: true;
  data: {
    restaurants: Restaurant[];
    pagination: Pagination;
  };
}

// Response error
export interface GetRestaurantsErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
