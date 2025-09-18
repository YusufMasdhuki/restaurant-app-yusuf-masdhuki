import { UserSidebar } from '@/components/container/user-sidebar';
import { Tabs } from '@/components/ui/tabs';
import type { OrderStatus } from '@/constants/order-statuses';
import type { RootState } from '@/store';
import { setStatus } from '@/store/slices/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrdersTabs from './OrdersTabs';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.orders);

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-300 px-4 pt-32 mx-auto flex justify-between gap-8 pb-25'>
        {/* Sidebar */}
        <div>
          <UserSidebar />
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
