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
  const hideLayout = currentPath === '/auth'; // cek path dari App

  return (
    <QueryClientProvider client={queryClient}>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      <Toaster />
    </QueryClientProvider>
  );
};

export default MainLayout;
