import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  LoginRequest,
  LoginSuccessResponse,
  LoginErrorResponse,
} from '@/types/login-type';
import { loginUser } from '@/services/auth/service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LoginSuccessResponse, LoginErrorResponse, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // simpan token
      localStorage.setItem('auth_token', data.data.token);

      // update cache profile agar Navbar langsung rerender
      queryClient.setQueryData(['profile'], data.data.user);

      // toast sukses
      toast.success('Login berhasil!');

      // redirect ke home
      navigate('/');
    },
    onError: (error) => {
      // toast gagal
      toast.error(error.message || 'Login gagal, coba lagi.');
    },
  });
};
