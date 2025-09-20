// MainLayout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './navbar';
import Footer from './footer';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const MainLayout: React.FC<{
  children: React.ReactNode;
  currentPath: string;
}> = ({ children, currentPath }) => {
  const hideLayoutPaths = ['/auth', '/success']; // daftar path yang hide layout
  const hideLayout = hideLayoutPaths.includes(currentPath);

  return (
    <QueryClientProvider client={queryClient}>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      <Toaster position='top-right' richColors />
    </QueryClientProvider>
  );
};

export default MainLayout;
