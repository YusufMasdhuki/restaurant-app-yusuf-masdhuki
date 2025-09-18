import clsx from 'clsx';
import LogoFoody from '@/components/icons/logo-foody';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/lib/useIsMobile';

interface LogoSectionProps {
  logoColor: string;
  textColor: string;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  logoColor,
  textColor,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div
      className='flex gap-4 items-center cursor-pointer'
      onClick={() => navigate('/')}
    >
      <LogoFoody
        className={clsx(
          'transition-colors duration-300 size-10 md:size-10.5',
          logoColor
        )}
      />
      {!isMobile && (
        <span
          className={clsx(
            'font-extrabold text-display-md transition-colors duration-300',
            textColor
          )}
        >
          Foody
        </span>
      )}
    </div>
  );
};
