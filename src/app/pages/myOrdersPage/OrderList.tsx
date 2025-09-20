import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { OrderCard } from './OrderCard';
import type { InfiniteData } from '@tanstack/react-query';
import type { MyOrderSuccessResponse, Order } from '@/types/order-type';

interface OrderListProps {
  data: InfiniteData<MyOrderSuccessResponse> | undefined;
  queryStatus: 'pending' | 'error' | 'success';
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  search: string;
}

export const OrderList = ({
  data,
  queryStatus,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  search,
}: OrderListProps) => {
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (queryStatus === 'pending')
    return (
      <div className='flex items-center justify-center h-[50vh]'>
        <p>Loading...</p>
      </div>
    );
  if (queryStatus === 'error')
    return <p className='text-red-500'>Failed to fetch orders</p>;

  // ✅ Flatten semua order dari infinite data
  const orders = data?.pages.flatMap((page) => page.data.orders) ?? [];

  // ✅ Filtering berdasarkan search
  const filtered = orders.filter(
    (o: Order) =>
      o.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      o.restaurants.some((r) =>
        r.restaurantName.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      {filtered.length === 0 ? (
        <div className='flex justify-center items-center h-[50vh]'>
          <p className='text-center font-medium'>No orders found</p>
        </div>
      ) : (
        filtered.map((order) => <OrderCard key={order.id} order={order} />)
      )}

      {hasNextPage && filtered.length > 0 && (
        <div ref={ref} className='flex justify-center'>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant='outline'
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
};
