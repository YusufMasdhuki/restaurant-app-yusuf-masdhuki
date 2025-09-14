import UserDropdown from '@/components/container/UserDropdown';
import BagIcon from '@/components/icons/bag-icon';
import LogoFoody from '@/components/icons/logo-foody';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/auth/useProfile';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data: user, setProfile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setProfile(null);
  };

  const isHome = location.pathname === '/';

  // ✅ colors based on page & scroll
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
      ? 'text-white hover:backdrop-blur-2xl hover:bg-white/10 hover:text-neutral-200'
      : 'text-black hover:bg-black/10 hover:text-black border-primary-100'
  );

  const signUpButtonClasses = clsx(
    'transition-colors duration-300',
    isHome
      ? ''
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

        {!user ? (
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
            <BagIcon
              className={clsx(
                'transition-colors duration-300 size-8',
                iconColor
              )}
            />
            <UserDropdown
              user={user}
              onLogout={handleLogout}
              scrolled={scrolled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
