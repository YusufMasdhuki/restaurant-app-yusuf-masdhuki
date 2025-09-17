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
import { MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MyOrders from '../icons/my-orders';
import LogOut from '../icons/log-out';

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
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='group flex items-center gap-4'>
          <img
            src='/images/default-avatar.png'
            alt={user.name}
            className='w-12 h-12 rounded-full object-cover'
          />
          <span
            className={clsx(
              'text-lg font-semibold group-hover:underline',
              textColor
            )}
          >
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>

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

        <DropdownMenuItem
          className={'cursor-pointer'}
          onClick={() => alert('Delivery Address clicked')}
        >
          <MapPin /> Delivery Address
        </DropdownMenuItem>

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => navigate('/my-orders')}
        >
          <MyOrders /> My Orders
        </DropdownMenuItem>

        <DropdownMenuItem
          className='cursor-pointer text-red-500'
          onClick={onLogout}
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
