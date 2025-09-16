import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { OrderCard } from './OrderCard';
import type { InfiniteData } from '@tanstack/react-query';
import type { MyOrderSuccessResponse } from '@/types/order-type';

interface OrderListProps {
  data: InfiniteData<MyOrderSuccessResponse> | undefined;
  queryStatus: 'pending' | 'error' | 'success';
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const OrderList = ({
  data,
  queryStatus,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: OrderListProps) => {
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (queryStatus === 'pending') return <p>Loading...</p>;
  if (queryStatus === 'error')
    return <p className='text-red-500'>Failed to fetch orders</p>;

  return (
    <div className='flex flex-col'>
      {data?.pages.flatMap((page) =>
        page.data.orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))
      )}

      {hasNextPage && (
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
