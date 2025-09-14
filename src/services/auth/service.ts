import type {
  RegisterErrorResponse,
  RegisterRequest,
  RegisterSuccessResponse,
} from '@/types/register-type';
import { api } from '../api';
import type { AxiosError } from 'axios';
import type {
  LoginErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
} from '@/types/login-type';
import type {
  ProfileErrorResponse,
  ProfileSuccessResponse,
} from '@/types/profile-type';
import type {
  UpdateProfileErrorResponse,
  UpdateProfileRequest,
  UpdateProfileSuccessResponse,
} from '@/types/update-profile-type';

// fungsi register
export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterSuccessResponse> => {
  try {
    const { data } = await api.post<RegisterSuccessResponse>(
      '/api/auth/register',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<RegisterErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as RegisterErrorResponse;
  }
};

// fungsi login
export const loginUser = async (
  payload: LoginRequest
): Promise<LoginSuccessResponse> => {
  try {
    const { data } = await api.post<LoginSuccessResponse>(
      '/api/auth/login',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<LoginErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as LoginErrorResponse;
  }
};

// fungsi get profile
export const getProfile = async (): Promise<ProfileSuccessResponse> => {
  try {
    const { data } = await api.get<ProfileSuccessResponse>('/api/auth/profile');
    return data;
  } catch (err) {
    const error = err as AxiosError<ProfileErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as ProfileErrorResponse;
  }
};

// fungsi update profile
export const updateProfile = async (
  payload: UpdateProfileRequest
): Promise<UpdateProfileSuccessResponse> => {
  try {
    const { data } = await api.put<UpdateProfileSuccessResponse>(
      '/api/auth/profile',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<UpdateProfileErrorResponse>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || 'Network error',
    } as UpdateProfileErrorResponse;
  }
};
