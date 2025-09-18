// components/navbar/CartIcon.tsx
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import BagIcon from '@/components/icons/bag-icon';

interface CartIconProps {
  totalItems: number;
  iconColor: string;
}

export const CartIcon: React.FC<CartIconProps> = ({
  totalItems,
  iconColor,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className='relative cursor-pointer'
      onClick={() => navigate('/my-cart')}
    >
      <BagIcon
        className={clsx(
          'transition-colors duration-300 size-7 md:size-8',
          iconColor
        )}
      />
      {totalItems > 0 && (
        <span className='absolute -top-2 -right-2 bg-primary-100 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
          {totalItems}
        </span>
      )}
    </div>
  );
};
