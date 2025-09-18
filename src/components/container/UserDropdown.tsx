'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ProfileData } from '@/types/profile-type';
import clsx from 'clsx';
import { MapPin, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MyOrders from '../icons/my-orders';
import LogOut from '../icons/log-out';
import { useState } from 'react';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';
import { useIsMobile } from '@/lib/useIsMobile';

interface UserDropdownProps {
  user: ProfileData;
  onLogout: () => void;
  scrolled: boolean;
  textColor?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  onLogout,
  scrolled,
  textColor = scrolled ? 'text-neutral-950' : 'text-white', // default
}) => {
  const isMobile = useIsMobile(); // default breakpoint 768
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClickAvatar = () => {
    if (!isMobile) navigate('/profile');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='normal'
          className='group flex items-center gap-4'
          onClick={handleClickAvatar}
        >
          <img
            src='/images/default-avatar.png'
            alt={user.name}
            className='md:size-12 size-10 rounded-full object-cover'
          />
          {!isMobile && ( // Hanya tampilkan nama di desktop
            <span
              className={clsx(
                'text-lg font-semibold group-hover:underline',
                textColor
              )}
            >
              {user.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {isMobile && (
        <DropdownMenuContent className='w-56 bg-white dark:bg-neutral-900 rounded-md shadow-md p-2'>
          <DropdownMenuItem asChild>
            <Link
              to='/profile'
              className='flex items-center gap-2 p-2 border-b group'
            >
              <img
                src='/images/default-avatar.png'
                alt={user.name}
                className='w-10 h-10 rounded-full object-cover'
              />
              <span className='text-lg group-hover:underline'>{user.name}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className={'cursor-pointer'}>
            <MapPin /> Delivery Address
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => navigate('/my-orders')}
          >
            <MyOrders /> My Orders
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => navigate('/my-reviews')}
          >
            <Star /> My Reviews
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer text-red-500'
            onClick={() => setConfirmOpen(true)}
          >
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}

      <LogoutConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onLogout();
          setConfirmOpen(false);
        }}
      />
    </DropdownMenu>
  );
};

export default UserDropdown;
