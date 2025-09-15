// hooks/useProfile.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '@/services/auth/service';
import type {
  ProfileData,
  ProfileSuccessResponse,
  ProfileErrorResponse,
} from '@/types/profile-type';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const query = useQuery<ProfileData, ProfileErrorResponse>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res: ProfileSuccessResponse = await getProfile();
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 menit
  });

  const setProfile = (profile: ProfileData | null) => {
    queryClient.setQueryData(['profile'], profile);
  };

  return { ...query, setProfile };
};
