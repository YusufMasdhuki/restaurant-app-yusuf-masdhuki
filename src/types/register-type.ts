// Request body
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// User object in response
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string; // ISO Date string
}

// Success response
export interface RegisterSuccessResponse {
  success: true;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Error response (400 / 409)
export interface RegisterErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
