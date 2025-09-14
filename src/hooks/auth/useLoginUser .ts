import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  LoginRequest,
  LoginSuccessResponse,
  LoginErrorResponse,
} from '@/types/login-type';
import { loginUser } from '@/services/auth/service';
import { useNavigate } from 'react-router-dom';

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LoginSuccessResponse, LoginErrorResponse, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);

      // Update profile cache sehingga Navbar langsung re-render
      queryClient.setQueryData(['profile'], data.data.user);

      navigate('/');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};
