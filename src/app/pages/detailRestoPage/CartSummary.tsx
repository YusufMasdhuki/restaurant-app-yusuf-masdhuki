import BagIcon from '@/components/icons/bag-icon';
import { Button } from '@/components/ui/button';
import React from 'react';

interface Props {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<Props> = ({
  totalItems,
  totalPrice,
  onCheckout,
}) => {
  if (totalItems === 0) return null; // ✅ sembunyikan kalau cart kosong

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white  shadow-[0_0_20px_rgba(203,202,202,0.25)] z-50'>
      <div className='max-w-300 px-4 flex items-center justify-between mx-auto h-16 md:h-20'>
        <div>
          <div className='flex items-center gap-1 md:gap-2'>
            <BagIcon className='size-5 md:size-6' />
            <p className='text-sm md:text-md text-neutral-950'>
              {totalItems} items
            </p>
          </div>
          <p className='text-md md:text-xl font-extrabold text-neutral-950'>
            Rp{totalPrice.toLocaleString('id-ID')}
          </p>
        </div>
        <Button
          onClick={onCheckout}
          className='bg-primary-100 text-white w-40 md:w-[230px] h-10 md:h-11'
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
