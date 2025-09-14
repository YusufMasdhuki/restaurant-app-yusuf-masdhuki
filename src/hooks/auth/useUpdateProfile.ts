import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { updateProfile } from '@/services/auth/service';
import type {
  UpdateProfileErrorResponse,
  UpdateProfileRequest,
  UpdateProfileSuccessResponse,
} from '@/types/update-profile-type';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateProfileSuccessResponse,
    AxiosError<UpdateProfileErrorResponse>,
    UpdateProfileRequest
  >({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['profile'] }); // 🔄 refresh data profile
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Update profile gagal');
    },
  });
};
