import { Button } from '@/components/ui/button';
import { useUpdateOrderStatus } from '@/hooks/orders/useUpdateOrderStatus';
import type { MyOrderSuccessResponse } from '@/types/order-type';
import OrderRestaurantCard from './order-restaurant-card';

type Order = MyOrderSuccessResponse['data']['orders'][number];

export const OrderCard = ({ order }: { order: Order }) => {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const handleUpdateStatus = (
    id: number,
    newStatus: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled'
  ) => {
    updateStatus({ id, payload: { status: newStatus } });
  };

  return (
    <>
      <div className='text-sm text-neutral-600 flex flex-col gap-5'>
        {order.restaurants.map((r) => {
          return (
            <OrderRestaurantCard
              key={r.restaurantId}
              restaurantId={r.restaurantId}
              restaurantName={r.restaurantName}
              items={r.items}
              subtotal={r.subtotal}
            />
          );
        })}
      </div>

      {/* Tombol aksi */}
      <div className='flex gap-2'>
        {order.status === 'preparing' && (
          <>
            <Button
              variant='destructive'
              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleUpdateStatus(order.id, 'on_the_way')}
              disabled={isPending}
            >
              Mark as On The Way
            </Button>
          </>
        )}
        {order.status === 'on_the_way' && (
          <Button
            onClick={() => handleUpdateStatus(order.id, 'delivered')}
            disabled={isPending}
          >
            Mark as Delivered
          </Button>
        )}
        {order.status === 'delivered' && (
          <Button
            onClick={() => handleUpdateStatus(order.id, 'done')}
            disabled={isPending}
          >
            Mark as Done
          </Button>
        )}
      </div>
    </>
  );
};
