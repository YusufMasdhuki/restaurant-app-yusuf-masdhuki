import LogoFoody from '@/components/icons/logo-foody';
import { Button } from '@/components/ui/button';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';
import type { CheckoutTransaction } from '@/types/checkout-type';
import dayjs from 'dayjs';
import { Check } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const state = location.state as { transaction: CheckoutTransaction };
  const navigate = useNavigate();

  if (!state?.transaction) {
    return (
      <div className='pt-32 text-center'>
        <h1 className='text-2xl font-bold'>No transaction found</h1>
        <Link to='/' className='text-blue-500 underline'>
          Back to home
        </Link>
      </div>
    );
  }

  // ✅ assign transaction dulu
  const { transaction } = state;

  // ✅ baru cari payment method
  const payment = PAYMENT_METHODS.find(
    (m) => m.id === transaction.paymentMethod
  );

  return (
    <div className='bg-neutral-200 min-h-screen flex items-center justify-center'>
      <div className='max-w-[428px] w-full mx-auto p-4 md:p-5'>
        <div className='flex items-center gap-4 justify-center mb-7'>
          <LogoFoody className='size-10.5 text-primary-100' />
          <h1 className='text-display-md font-extrabold text-neutral-950'>
            Foody
          </h1>
        </div>

        <div className='relative flex flex-col justify-center items-center gap-0.5 p-4 md:p-5 bg-white rounded-t-2xl'>
          <div
            className='absolute bottom-0 left-0 right-0 h-px bg-transparent 
                  [background-image:repeating-linear-gradient(90deg,#d4d4d8_0_4px,transparent_4px_8px)]'
          />

          <div className='absolute bottom-0 left-0 w-2.5 h-2.5 bg-neutral-200 rounded-tr-full' />
          <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-neutral-200 rounded-tl-full' />
          <div className='size-16 rounded-full bg-[#44AB09] flex items-center justify-center'>
            <Check className='text-white size-12' />
          </div>
          <h2 className='text-lg md:text-xl font-extrabold text-neutral-950'>
            Payment Success
          </h2>
          <p className='text-neutral-950 text-sm md:text-md text-center'>
            Your payment has been successfully processed.
          </p>
        </div>
        <div className='relative bg-white p-5  text-neutral-950'>
          {/* sudut cekungan */}
          <div className='absolute top-0 left-0 w-2.5 h-2.5 bg-neutral-200 rounded-br-full' />
          <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-neutral-200 rounded-bl-full' />
          <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-neutral-200 rounded-tl-full' />
          <div className='absolute bottom-0 left-0 w-2.5 h-2.5 bg-neutral-200 rounded-tr-full' />

          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <span className='text-sm md:text-md font-medium'>Date</span>
              <span className='text-sm md:text-md font-bold'>
                {dayjs(transaction.createdAt).format('DD MMMM YYYY, HH:mm')}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm md:text-md font-medium'>
                Payment Method
              </span>
              <span className='font-bold text-sm md:text-md'>
                {payment ? payment.name : transaction.paymentMethod}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm md:text-md font-medium'>
                Price (
                {transaction.restaurants.reduce(
                  (acc, resto) =>
                    acc +
                    resto.items.reduce((sum, item) => sum + item.quantity, 0),
                  0
                )}
                items)
              </span>
              <span className='font-bold text-sm md:text-md'>
                Rp {transaction.pricing.subtotal.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm md:text-md font-medium'>
                Delivery Fee
              </span>
              <span className='font-bold text-sm md:text-md'>
                Rp {transaction.pricing.deliveryFee.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm md:text-md font-medium'>
                Service Fee
              </span>
              <span className='font-bold text-sm md:text-md'>
                Rp {transaction.pricing.serviceFee.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className='relative bg-white p-5 rounded-b-2xl'>
          <div
            className='absolute top-0 left-0 right-0 h-px bg-transparent 
                  [background-image:repeating-linear-gradient(90deg,#d4d4d8_0_4px,transparent_4px_8px)]'
          />
          <div className='absolute top-0 left-0 w-2.5 h-2.5 bg-neutral-200 rounded-br-full' />
          <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-neutral-200 rounded-bl-full' />
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <span className='text-md md:text-lg font-medium'>Total</span>
              <span className='font-extrabold text-md md:text-lg'>
                Rp {transaction.pricing.totalPrice.toLocaleString()}
              </span>
            </div>
            <Button
              onClick={() => navigate('/my-orders')}
              className='w-full bg-primary-100 hover:bg-[#db6d65] text-white'
            >
              See My Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
