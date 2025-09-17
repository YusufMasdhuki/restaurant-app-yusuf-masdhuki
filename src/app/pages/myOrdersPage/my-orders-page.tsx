import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import type { OrderStatus } from '@/constants/order-statuses';
import { useProfile } from '@/hooks/auth/useProfile';
import type { RootState } from '@/store';
import { setStatus } from '@/store/slices/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrdersTabs from './OrdersTabs';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.orders);

  const { data: profile, isLoading } = useProfile();

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-300 px-4 pt-32 mx-auto flex justify-between gap-8'>
        {/* Sidebar */}
        <div>
          <div className='min-w-60 shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-5'>
            <div className='flex items-center gap-2 pb-6 border-b border-neutral-300'>
              <img
                src='/images/default-avatar.png'
                alt='avatar'
                className='w-12 h-12'
              />
              <h2 className='text-lg font-bold text-neutral-950'>
                {isLoading ? 'Loading...' : profile?.name ?? 'User Name'}
              </h2>
            </div>
            <div className='flex flex-col gap-6 mt-6'>
              <Button variant='underline' className='h-7 justify-start text-md'>
                Delivery Address
              </Button>
              <Button variant='underline' className='h-7 justify-start text-md'>
                My Orders
              </Button>
              <Button variant='underline' className='h-7 justify-start text-md'>
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Section */}

        <Tabs
          value={status}
          onValueChange={(val) => dispatch(setStatus(val as OrderStatus))}
          className='w-full'
        >
          <h1 className='text-display-md font-extrabold mb-6'>My Orders</h1>

          <OrdersTabs />
        </Tabs>
      </div>
    </div>
  );
};

export default MyOrdersPage;
