import { UserSidebar } from '@/components/container/user-sidebar';
import { Tabs } from '@/components/ui/tabs';
import type { OrderStatus } from '@/constants/order-statuses';
import type { RootState } from '@/store';
import { setStatus } from '@/store/slices/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrdersTabs from './OrdersTabs';
import { useIsMobile } from '@/lib/useIsMobile';
import { useEffect } from 'react';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.orders);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-300 w-full px-4 pt-20 md:pt-32 mx-auto flex justify-between gap-8 pb-12 md:pb-25'>
        {!isMobile && (
          <div>
            <UserSidebar />
          </div>
        )}

        <div className='min-w-0 flex-1'>
          <Tabs
            value={status}
            onValueChange={(val) => dispatch(setStatus(val as OrderStatus))}
            className='w-full'
          >
            <h1 className='text-display-xs md:text-display-md font-extrabold mb-4 md:mb-6 '>
              My Orders
            </h1>
            <OrdersTabs />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
