// Menu contoh di restoran rekomendasi
export interface SampleMenu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

// Data restoran rekomendasi
export interface RecommendedRestaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  sampleMenus: SampleMenu[];
  isFrequentlyOrdered: boolean;
}

// Response sukses
export interface GetRecommendedRestaurantsSuccessResponse {
  success: true;
  data: {
    recommendations: RecommendedRestaurant[];
    message: string;
  };
}

// Response error
export interface GetRecommendedRestaurantsErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
