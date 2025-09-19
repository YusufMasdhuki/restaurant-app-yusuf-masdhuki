import { registerUser } from '@/services/auth/service';
import type {
  RegisterErrorResponse,
  RegisterRequest,
  RegisterSuccessResponse,
} from '@/types/register-type';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation<
    RegisterSuccessResponse,
    RegisterErrorResponse,
    RegisterRequest
  >({
    mutationFn: registerUser,
    onSuccess: () => {
      // ✅ Jangan simpan token
      // cukup kasih notifikasi / redirect ke login page
      toast.success('Register successful!');

      // misalnya redirect ke halaman login
      navigate('/auth?tab=login');
    },
    onError: () => {
      toast.error('Register failed');
    },
  });
};
