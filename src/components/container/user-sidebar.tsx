import { useLocation, Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import MyOrders from '@/components/icons/my-orders';
import LogOut from '@/components/icons/log-out';
import { useProfile } from '@/hooks/auth/useProfile';
import { useLogout } from '@/hooks/auth/useLogout';
import { useState } from 'react';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';

export const UserSidebar = () => {
  const { data: profile, isLoading } = useProfile();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const getButtonClass = (path: string) =>
    clsx(
      'h-7 justify-start gap-2 text-md',
      location.pathname === path ? 'text-primary-100' : 'text-neutral-950'
    );

  return (
    <div className='min-w-60 shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-5'>
      <Link
        to='/profile'
        className={clsx(
          'flex items-center gap-2 pb-6 border-b border-neutral-300 group',
          location.pathname === '/profile'
            ? 'text-primary-100'
            : 'text-neutral-950'
        )}
      >
        <img
          src='/images/default-avatar.png'
          alt='avatar'
          className='w-12 h-12'
        />
        <h2 className='text-lg font-bold group-hover:underline'>
          {isLoading ? 'Loading...' : profile?.name ?? 'User Name'}
        </h2>
      </Link>

      <div className='flex flex-col gap-6 mt-6'>
        <Button
          variant='underline'
          className={getButtonClass('/delivery-address')}
        >
          <MapPin className='w-6 h-6' /> Delivery Address
        </Button>
        <Button
          variant='underline'
          className={getButtonClass('/my-orders')}
          onClick={() => navigate('/my-orders')}
        >
          <MyOrders className='w-6 h-6' /> My Orders
        </Button>
        <Button
          variant='underline'
          className={getButtonClass('/my-reviews')}
          onClick={() => navigate('/my-reviews')}
        >
          <Star className='w-6 h-6' /> My Reviews
        </Button>
        <Button
          variant='underline'
          className='h-7 justify-start gap-2 text-md'
          onClick={() => setConfirmOpen(true)}
        >
          <LogOut className='w-6 h-6' /> Logout
        </Button>
      </div>

      <LogoutConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          logout();
          setConfirmOpen(false);
        }}
      />
    </div>
  );
};
