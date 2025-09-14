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

interface UserDropdownProps {
  user: ProfileData;
  onLogout: () => void;
  scrolled: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  onLogout,
  scrolled,
}) => {
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
              scrolled ? 'text-neutral-950' : 'text-white'
            )}
          >
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 bg-white dark:bg-neutral-900 rounded-md shadow-md p-2'>
        <div className='flex items-center gap-2 p-2 border-b'>
          <img
            src='/images/default-avatar.png'
            alt={user.name}
            className='w-10 h-10 rounded-full object-cover'
          />
          <span className='text-lg'>{user.name}</span>
        </div>

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => alert('Delivery Address clicked')}
        >
          Delivery Address
        </DropdownMenuItem>

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => alert('My Orders clicked')}
        >
          My Orders
        </DropdownMenuItem>

        <DropdownMenuItem
          className='cursor-pointer text-red-500'
          onClick={onLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
