import { TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useMyOrdersInfinite } from '@/hooks/orders/useMyOrders';
import { OrderList } from './OrderList';
import { ORDER_STATUSES, type OrderStatus } from '@/constants/order-statuses';
import type { InfiniteData } from '@tanstack/react-query';
import type { MyOrderSuccessResponse } from '@/types/order-type';
import { Button } from '@/components/ui/button';

interface OrdersTabsProps {
  status: OrderStatus;
}

export const OrdersTabs: React.FC<OrdersTabsProps> = ({ status }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: queryStatus,
  } = useMyOrdersInfinite({ status, limit: 5 });

  return (
    <div className='p-6 bg-white rounded-2xl'>
      <TabsList className='mb-6 flex flex-wrap gap-2 w-full'>
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
            data={data as InfiniteData<MyOrderSuccessResponse> | undefined} // ✅ pakai assertion jika TS complain
            queryStatus={queryStatus}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </TabsContent>
      ))}
    </div>
  );
};
