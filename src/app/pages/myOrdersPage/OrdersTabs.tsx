import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ORDER_STATUSES } from '@/constants/order-statuses';
import { useMyOrdersInfinite } from '@/hooks/orders/useMyOrders';
import type { RootState } from '@/store';
import { setSearch } from '@/store/slices/ordersSlice';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderList } from './OrderList';

const OrdersTabs = () => {
  const dispatch = useDispatch();
  const { status, search } = useSelector((state: RootState) => state.orders);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: queryStatus,
  } = useMyOrdersInfinite({ status, limit: 5 });

  return (
    <div className='p-6 bg-white rounded-2xl'>
      <div className='relative mb-5'>
        <Input
          className='w-full max-w-[598px] h-11 pl-10.5 rounded-full border border-neutral-300 text-sm'
          placeholder='Search'
          value={search[status] ?? ''}
          onChange={(e) =>
            dispatch(setSearch({ status, query: e.target.value }))
          }
        />
        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500' />
      </div>
      <TabsList className='mb-6 flex items-center gap-3 w-full'>
        <h2 className='text-lg font-bold text-neutral-950'>Status</h2>
        {ORDER_STATUSES.map((s) => (
          <TabsTrigger key={s.value} value={s.value} asChild className='w-auto'>
            <Button
              size='md'
              className='px-4 w-auto border border-neutral-300 data-[state=active]:border-primary-100 data-[state=active]:text-primary-100'
            >
              {s.label}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>

      {ORDER_STATUSES.map((s) => (
        <TabsContent key={s.value} value={s.value}>
          <OrderList
            data={data}
            queryStatus={queryStatus}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            search={search[s.value] ?? ''}
          />
        </TabsContent>
      ))}
    </div>
  );
};

export default OrdersTabs;
