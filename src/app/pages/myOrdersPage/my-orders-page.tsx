import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { formatRupiah } from '@/lib/format-rupiah';
import { useMyOrdersInfinite } from '@/hooks/orders/useMyOrders ';
import type { InfiniteData } from '@tanstack/react-query';
import type { MyOrderSuccessResponse } from '@/types/order-type';
import { useUpdateOrderStatus } from '@/hooks/orders/useUpdateOrderStatus ';

const ORDER_STATUSES = [
  { value: 'preparing', label: 'Preparing' },
  { value: 'on_the_way', label: 'On The Way' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;

const MyOrdersPage = () => {
  const [status, setStatus] = useState<
    'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled'
  >('preparing');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: queryStatus,
  } = useMyOrdersInfinite({ status, limit: 5 });

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  const handleUpdateStatus = (
    id: number,
    newStatus: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled'
  ) => {
    updateStatus({ id, payload: { status: newStatus } });
  };

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const pages = (data as InfiniteData<MyOrderSuccessResponse> | undefined)
    ?.pages;

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-300 px-4 pt-32 mx-auto flex justify-between gap-8'>
        {/* Sidebar */}
        <div className='w-60 shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-2xl p-5'>
          <div className='flex items-center gap-2 pb-6 border-b border-neutral-300'>
            <img
              src='/images/default-avatar.png'
              alt='avatar'
              className='size-12'
            />
            <h2 className='text-lg font-bold text-neutral-950'>user name</h2>
          </div>
          <div className='flex flex-col gap-6 mt-6'>
            <Button
              variant='underline'
              className='h-7.5 justify-start text-md font-medium text-neutral-950'
            >
              Delivery Address
            </Button>
            <Button
              variant='underline'
              className='h-7.5 justify-start text-md font-medium text-neutral-950'
            >
              My Orders
            </Button>
            <Button
              variant='underline'
              className='h-7.5 justify-start text-md font-medium text-neutral-950'
            >
              Logout
            </Button>
          </div>
        </div>

        {/* My Orders */}
        <Tabs
          value={status}
          onValueChange={(val) =>
            setStatus(val as (typeof ORDER_STATUSES)[number]['value'])
          }
          className='w-full'
        >
          <h1 className='text-display-md font-extrabold mb-6'>My Orders</h1>
          <TabsList className='mb-6 flex flex-wrap gap-2 w-full'>
            {ORDER_STATUSES.map((s) => (
              <TabsTrigger key={s.value} value={s.value}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {ORDER_STATUSES.map((s) => (
            <TabsContent key={s.value} value={s.value}>
              {queryStatus === 'pending' && <p>Loading...</p>}
              {queryStatus === 'error' && (
                <p className='text-red-500'>Failed to fetch orders</p>
              )}
              {queryStatus === 'success' && (
                <div className='flex flex-col gap-4'>
                  {pages?.flatMap((page) =>
                    page.data.orders.map((order) => (
                      <div
                        key={order.id}
                        className='border rounded-xl p-4 shadow-sm bg-white'
                      >
                        <div className='flex justify-between items-center mb-2'>
                          <span className='font-semibold'>
                            #{order.transactionId}
                          </span>
                          <span className='text-sm capitalize'>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className='text-sm text-neutral-600 mb-2'>
                          {order.restaurants.map((r) => (
                            <div key={r.restaurantId}>
                              <div className='flex items-center gap-2 mb-4'>
                                <img
                                  src='/icons/resto-icon.svg'
                                  alt='resto icon'
                                  className='w-8 h-8'
                                />
                                <p className='font-bold text-lg text-neutral-950'>
                                  {r.restaurantName}
                                </p>
                              </div>
                              {r.items.map((item) => (
                                <p key={item.menuId}>
                                  {item.menuName} × {item.quantity}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className='flex justify-between font-medium mb-3'>
                          <span>Total</span>
                          <span>{formatRupiah(order.pricing.totalPrice)}</span>
                        </div>

                        {/* ✅ Tombol aksi sesuai status */}
                        <div className='flex gap-2'>
                          {order.status === 'preparing' && (
                            <>
                              <Button
                                variant='destructive'
                                onClick={() =>
                                  handleUpdateStatus(order.id, 'cancelled')
                                }
                                disabled={isUpdating}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() =>
                                  handleUpdateStatus(order.id, 'on_the_way')
                                }
                                disabled={isUpdating}
                              >
                                Mark as On The Way
                              </Button>
                            </>
                          )}

                          {order.status === 'on_the_way' && (
                            <Button
                              onClick={() =>
                                handleUpdateStatus(order.id, 'delivered')
                              }
                              disabled={isUpdating}
                            >
                              Mark as Delivered
                            </Button>
                          )}

                          {order.status === 'delivered' && (
                            <Button
                              onClick={() =>
                                handleUpdateStatus(order.id, 'done')
                              }
                              disabled={isUpdating}
                            >
                              Mark as Done
                            </Button>
                          )}
                        </div>
                      </div>
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
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MyOrdersPage;
