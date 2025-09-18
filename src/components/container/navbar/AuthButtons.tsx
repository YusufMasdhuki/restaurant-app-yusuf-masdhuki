import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/lib/useIsMobile';
import { HamburgerMenu } from './HamburgerMenu';

interface AuthButtonsProps {
  signInClasses: string;
  signUpClasses: string;
  textColor: string;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
  signInClasses,
  signUpClasses,
  textColor,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile → tampilkan hamburger menu
    return <HamburgerMenu textColor={textColor} />;
  }

  // Desktop → tampilkan tombol Sign In / Sign Up
  return (
    <div className='flex items-center gap-4'>
      <Button
        className={signInClasses}
        onClick={() => navigate('/auth?tab=login')}
      >
        Sign In
      </Button>
      <Button
        className={signUpClasses}
        onClick={() => navigate('/auth?tab=register')}
      >
        Sign Up
      </Button>
    </div>
  );
};
