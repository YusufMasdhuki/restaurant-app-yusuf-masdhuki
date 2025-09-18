import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UserDropdown from '@/components/container/UserDropdown';
import BagIcon from '@/components/icons/bag-icon';
import LogoFoody from '@/components/icons/logo-foody';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/auth/useLogout';
import { useProfile } from '@/hooks/auth/useProfile';
import { useCart } from '@/hooks/cart/useCart';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Ambil profile dan cart via React Query
  const { data: user, isLoading: loadingProfile } = useProfile();
  const { data: cartData } = useCart();
  const totalItems = cartData?.data?.summary?.totalItems ?? 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = useLogout();

  const isHome = location.pathname === '/';

  // ✅ warna navbar & icon
  const bgColor = isHome
    ? scrolled
      ? 'bg-white shadow-md'
      : 'bg-white/0'
    : 'bg-white shadow-md';
  const logoColor = isHome
    ? scrolled
      ? 'text-primary-100'
      : 'text-white'
    : 'text-primary-100';
  const textColor = isHome
    ? scrolled
      ? 'text-black'
      : 'text-white'
    : 'text-black';
  const iconColor = isHome
    ? scrolled
      ? 'text-black'
      : 'text-white'
    : 'text-black';

  const signInButtonClasses = clsx(
    'bg-transparent transition-colors duration-300',
    isHome
      ? scrolled
        ? 'text-black hover:bg-black/10 hover:text-black border-primary-100'
        : 'text-white hover:backdrop-blur-2xl hover:bg-white/10 hover:text-neutral-200'
      : 'text-black hover:bg-black/10 hover:text-black border-primary-100'
  );

  const signUpButtonClasses = clsx(
    'transition-colors duration-300',
    isHome
      ? scrolled
        ? 'bg-primary-100 text-white border-primary-100 hover:bg-[#ba534c]'
        : 'bg-white text-black hover:bg-primary-300'
      : 'bg-primary-100 text-white border-primary-100 hover:bg-[#ba534c]'
  );

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 right-0 h-20 flex justify-center items-center transition-colors duration-300 z-50',
        bgColor
      )}
    >
      <div className='flex justify-between items-center w-full max-w-300 px-4'>
        {/* Logo */}
        <div
          className='flex gap-4 items-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          <LogoFoody
            className={clsx('transition-colors duration-300', logoColor)}
          />
          <span
            className={clsx(
              'font-extrabold text-display-md transition-colors duration-300',
              textColor
            )}
          >
            Foody
          </span>
        </div>

        {/* Auth / User */}
        {loadingProfile ? null : !user ? (
          <div className='flex items-center gap-4'>
            <Button
              className={signInButtonClasses}
              onClick={() => navigate('/auth?tab=login')}
            >
              Sign In
            </Button>
            <Button
              className={signUpButtonClasses}
              onClick={() => navigate('/auth?tab=register')}
            >
              Sign Up
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-6'>
            {/* Bag Icon with badge */}
            <div
              className='relative cursor-pointer'
              onClick={() => navigate('/my-cart')}
            >
              <BagIcon
                className={clsx(
                  'transition-colors duration-300 size-8',
                  iconColor
                )}
              />
              {totalItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-primary-100 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                  {totalItems}
                </span>
              )}
            </div>

            <UserDropdown
              user={user}
              onLogout={logout}
              scrolled={scrolled}
              textColor={textColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
