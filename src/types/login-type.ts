// Request body
export interface LoginRequest {
  email: string;
  password: string;
}

// User object in response
export interface LoginUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt?: string; // kadang ada, kadang tidak -> optional
}

// Success response
export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    user: LoginUser;
    token: string;
  };
}

// Error response (400 / 401)
export interface LoginErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
