// components/navbar/Navbar.tsx
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProfile } from '@/hooks/auth/useProfile';
import { useCart } from '@/hooks/cart/useCart';
import { useLogout } from '@/hooks/auth/useLogout';
import UserDropdown from '@/components/container/UserDropdown';
import { LogoSection } from '@/components/container/navbar/LogoSection';
import { AuthButtons } from '@/components/container/navbar/AuthButtons';
import { CartIcon } from '@/components/container/navbar/CartIcon';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data: user, isLoading } = useProfile();
  const { data: cartData } = useCart();
  const totalItems = cartData?.data?.summary?.totalItems ?? 0;
  const location = useLocation();
  const logout = useLogout();

  const isHome = location.pathname === '/';
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
  const iconColor = textColor;

  const signInClasses = clsx(
    'bg-transparent transition-colors duration-300',
    isHome
      ? scrolled
        ? 'text-black hover:bg-black/10 hover:text-black border-primary-100'
        : 'text-white hover:backdrop-blur-2xl hover:bg-white/10 hover:text-neutral-200'
      : 'text-black hover:bg-black/10 hover:text-black border-primary-100'
  );
  const signUpClasses = clsx(
    'transition-colors duration-300',
    isHome
      ? scrolled
        ? 'bg-primary-100 text-white border-primary-100 hover:bg-[#ba534c]'
        : 'bg-white text-black hover:bg-primary-300'
      : 'bg-primary-100 text-white border-primary-100 hover:bg-[#ba534c]'
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 right-0 h-16 md:h-20 flex justify-center items-center transition-colors duration-300 z-50',
        bgColor
      )}
    >
      <div className='flex justify-between items-center w-full max-w-300 px-4'>
        <LogoSection logoColor={logoColor} textColor={textColor} />
        {isLoading ? null : !user ? (
          <AuthButtons
            signInClasses={signInClasses}
            signUpClasses={signUpClasses}
            textColor={textColor}
          />
        ) : (
          <div className='flex items-center gap-4 md:gap-6'>
            <CartIcon totalItems={totalItems} iconColor={iconColor} />
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
