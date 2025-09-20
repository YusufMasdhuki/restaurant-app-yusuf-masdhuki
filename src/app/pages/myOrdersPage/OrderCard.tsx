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
    <div className='bg-white rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      {/* List restoran */}
      <div className='text-sm flex flex-col gap-3 md:gap-5'>
        {order.restaurants.map((r) => (
          <OrderRestaurantCard
            key={r.restaurantId}
            restaurantId={r.restaurantId}
            restaurantName={r.restaurantName}
            items={r.items}
            subtotal={r.subtotal}
            transactionId={order.transactionId}
            status={order.status}
          />
        ))}
      </div>

      <div className='p-4 md:p-6 rounded-b-2xl bg-white border-t-3 border-dashed border-neutral-300 shadow-[0_0_20px_rgba(203,202,202,0.25)] flex flex-col gap-4 md:gap-6'>
        {/* Total harga */}
        <div className='flex justify-end items-center gap-4 text-sm font-semibold text-neutral-900'>
          <span className='text-sm md:text-md font-medium text-neutral-950'>
            Total All
          </span>
          <span className='text-md md:text-xl font-extrabold text-neutral-950'>
            Rp {order.pricing.totalPrice.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Tombol aksi */}
        {order.status !== 'done' && order.status !== 'cancelled' && (
          <div className='flex flex-col md:flex-row gap-2 md:justify-end'>
            {order.status === 'preparing' && (
              <>
                <Button
                  className='px-4 bg-neutral-300'
                  onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                  size='normal'
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(order.id, 'on_the_way')}
                  disabled={isPending}
                  size='normal'
                  className='px-4 bg-primary-100 hover:bg-[#db6d65] text-white'
                >
                  Mark as On The Way
                </Button>
              </>
            )}

            {order.status === 'on_the_way' && (
              <Button
                onClick={() => handleUpdateStatus(order.id, 'delivered')}
                disabled={isPending}
                size='normal'
                className='md:max-w-60 w-full bg-primary-100 hover:bg-[#db6d65] text-white'
              >
                Mark as Delivered
              </Button>
            )}

            {order.status === 'delivered' && (
              <Button
                onClick={() => handleUpdateStatus(order.id, 'done')}
                disabled={isPending}
                size='normal'
                className='md:max-w-60 w-full bg-primary-100 hover:bg-[#db6d65] text-white'
              >
                Mark as Done
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
