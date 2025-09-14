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

  const query = useQuery<ProfileData | null, ProfileErrorResponse>({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const res: ProfileSuccessResponse = await getProfile();
        return res.data;
      } catch {
        return null; // kalau error, kembalikan null agar UI tetap bisa render
      }
    },
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: false,
    initialData: null, // <- pastikan initial data null
  });

  const setProfile = (profile: ProfileData | null) => {
    queryClient.setQueryData(['profile'], profile);
  };

  return { ...query, setProfile };
};
