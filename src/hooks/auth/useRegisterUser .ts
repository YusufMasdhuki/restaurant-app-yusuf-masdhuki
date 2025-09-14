import { registerUser } from '@/services/auth/service';
import type {
  RegisterErrorResponse,
  RegisterRequest,
  RegisterSuccessResponse,
} from '@/types/register-type';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation<
    RegisterSuccessResponse,
    RegisterErrorResponse,
    RegisterRequest
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // ✅ Jangan simpan token
      // cukup kasih notifikasi / redirect ke login page
      console.log('Register success:', data.message);

      // misalnya redirect ke halaman login
      navigate('/auth?tab=login');
    },
    onError: (error) => {
      console.error('Register failed:', error.message);
    },
  });
};
