import { ReviewDialog } from '@/components/container/ReviewDialog';
import { Button } from '@/components/ui/button';
import { useRestoDetail } from '@/hooks/restaurants/useRestoDetail';
import type { OrderItem } from '@/types/order-type';
import type { RestoMenu } from '@/types/resto-detail-type';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface OrderRestaurantProps {
  restaurantId: number;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
  transactionId: string;
  status: string;
}

const OrderRestaurantCard: React.FC<OrderRestaurantProps> = ({
  restaurantId,
  restaurantName,
  items,
  subtotal,
  transactionId, // pastikan props ini ada
  status, // tambahkan status order
}) => {
  const { data: restoDetail } = useRestoDetail(restaurantId, {
    limitMenu: 50,
  });
  const menus: RestoMenu[] = restoDetail?.data.menus ?? [];
  const [openReview, setOpenReview] = useState(false);

  return (
    <div className='bg-white  p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      <Link
        to={`/detail-restaurant/${restaurantId}`}
        className='flex items-center gap-2 mb-5'
      >
        <img src='/icons/resto-icon.svg' alt='resto-icon' className='w-8 h-8' />
        <p className='font-bold text-lg text-neutral-950'>{restaurantName}</p>
      </Link>
      <div className='flex flex-col gap-5 border-b border-neutral-300 pb-5'>
        {items.map((item: OrderItem) => {
          const menu = menus.find((m) => m.id === item.menuId);
          return (
            <div key={item.menuId} className='flex items-center gap-4'>
              <div className='w-20 h-20 rounded-xl overflow-hidden'>
                <img
                  src={menu?.image ?? '/icons/menu-placeholder.svg'}
                  alt={item.menuName}
                  className='w-full h-full object-center object-cover rounded-xl'
                />
              </div>

              <div>
                <p className='text-md font-medium text-neutral-950'>
                  {item.menuName}
                </p>
                <p className='text-md font-extrabold text-neutral-950'>
                  {item.quantity} x Rp{item.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='pt-5 flex items-center justify-between'>
        <div>
          <h3 className='text-md font-medium text-neutral-950'>Total</h3>
          <p className='text-xl font-extrabold text-neutral-950'>
            Rp{subtotal.toLocaleString('id-ID')}
          </p>
        </div>
        {status === 'done' && (
          <Button
            className='text-white bg-primary-100 w-60'
            onClick={() => setOpenReview(true)}
          >
            Give Review
          </Button>
        )}
      </div>
      {/* Review Dialog */}
      <ReviewDialog
        open={openReview}
        onClose={() => setOpenReview(false)}
        restaurantId={restaurantId}
        transactionId={transactionId}
      />
    </div>
  );
};

export default OrderRestaurantCard;
