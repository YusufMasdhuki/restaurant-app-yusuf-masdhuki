import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface HamburgerMenuProps {
  textColor: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ textColor }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='normal' className='p-2'>
          <Menu size={24} className={clsx('', textColor)} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48 bg-white dark:bg-neutral-900 rounded-md shadow-md p-2'>
        <DropdownMenuItem onClick={() => navigate('/auth?tab=login')}>
          Sign In
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/auth?tab=register')}>
          Sign Up
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
