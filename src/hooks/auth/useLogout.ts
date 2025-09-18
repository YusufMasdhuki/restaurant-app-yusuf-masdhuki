// hooks/auth/useLogout.ts
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    // Hapus token
    localStorage.removeItem('auth_token');

    // Reset cache profile agar React Query langsung return null
    queryClient.setQueryData(['profile'], null);

    // // Opsional: redirect ke halaman login / home
    // navigate('/auth?tab=login');
  };

  return logout;
};
