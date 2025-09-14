// Request body
export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}

// Profile data (response user object)
export interface UpdatedProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string; // ISO Date string
}

// Success response
export interface UpdateProfileSuccessResponse {
  success: true;
  message: string;
  data: UpdatedProfile;
}

// Error response (400, 401, 409)
export interface UpdateProfileErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
