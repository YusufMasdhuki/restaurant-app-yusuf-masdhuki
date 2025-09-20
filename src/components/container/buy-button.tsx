import { Button } from '@/components/ui/button';
import { useCheckoutOrder } from '@/hooks/orders/useCheckoutOrder';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  paymentMethod: string;
  deliveryAddress: string;
}

const BuyButton: React.FC<Props> = ({ paymentMethod, deliveryAddress }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCheckoutOrder();
  const [error, setError] = useState<string | null>(null);

  const handleBuy = () => {
    setError(null);

    mutate(
      {
        paymentMethod,
        deliveryAddress,
        notes: 'Please deliver fast', // opsional
      },
      {
        onSuccess: (res) => {
          navigate('/success', {
            state: { transaction: res.data.transaction },
          });
        },
        onError: (err) => {
          setError(err.response?.data?.message ?? 'Checkout failed');
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      {error && <p className='text-sm text-red-500'>{error}</p>}
      <Button
        onClick={handleBuy}
        disabled={isPending}
        className='h-11 md:h-12 w-full font-bold bg-primary-100 hover:bg-[#db6d65] text-white'
      >
        {isPending ? 'Processing...' : 'Buy'}
      </Button>
    </div>
  );
};

export default BuyButton;
