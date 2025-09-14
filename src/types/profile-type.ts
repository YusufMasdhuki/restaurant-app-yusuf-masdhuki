// User profile data
export interface ProfileData {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string; // ISO Date string
}

// Success response
export interface ProfileSuccessResponse {
  success: true;
  message: string;
  data: ProfileData;
}

// Error response (401 unauthorized)
export interface ProfileErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
