import { ReviewDialog } from '@/components/container/ReviewDialog';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/auth/useProfile';
import { useRestoDetail } from '@/hooks/restaurants/useRestoDetail';
import type { OrderItem } from '@/types/order-type';
import type { RestoMenu } from '@/types/resto-detail-type';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  transactionId,
  status,
}) => {
  const { data: restoDetail } = useRestoDetail(restaurantId, { limitMenu: 50 });
  const menus: RestoMenu[] = restoDetail?.data.menus ?? [];
  const [openReview, setOpenReview] = useState(false);
  const navigate = useNavigate();

  const { data: profile } = useProfile(); // ambil user login
  const currentUserId = profile?.id;

  // ambil review user untuk resto ini
  const review = restoDetail?.data.reviews.find(
    (r) => r.user.id === currentUserId
  );

  return (
    <div className='bg-white p-4 md:p-5 shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      {/* Header */}
      <Link
        to={`/detail-restaurant/${restaurantId}`}
        className='flex items-center gap-2 mb-3 md:mb-5 group'
      >
        <img src='/icons/resto-icon.svg' alt='resto-icon' className='w-8 h-8' />
        <p className='font-bold text-sm md:text-lg text-neutral-950 group-hover:text-primary-100'>
          {restaurantName}
        </p>
      </Link>

      {/* Items */}
      <div className='flex flex-col gap-3 md:gap-5 border-b border-neutral-300 pb-3 md:pb-5'>
        {items.map((item) => {
          const menu = menus.find((m) => m.id === item.menuId);
          return (
            <div key={item.menuId} className='flex items-center gap-3 md:gap-4'>
              <div className='md:size-20 size-16 rounded-xl overflow-hidden'>
                <img
                  src={menu?.image ?? '/icons/menu-placeholder.svg'}
                  alt={item.menuName}
                  className='w-full h-full object-center object-cover rounded-xl'
                />
              </div>
              <div>
                <p className='text-sm md:text-md font-medium text-neutral-950'>
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

      {/* Footer */}
      <div className='pt-3 md:pt-5 flex flex-col md:flex-row md:items-center md:justify-between'>
        <div className=' mb-3 md:mb-0'>
          <h3 className='text-sm md:text-md font-medium text-neutral-950'>
            Total
          </h3>
          <p className='text-md md:text-xl font-extrabold text-neutral-950'>
            Rp{subtotal.toLocaleString('id-ID')}
          </p>
        </div>

        {status === 'done' &&
          (review ? (
            <Button
              className='text-white bg-neutral-700 hover:bg-neutral-600 w-full md:max-w-60'
              size='normal'
              onClick={() => navigate('/my-reviews')}
            >
              See Review
            </Button>
          ) : (
            <Button
              className='text-white bg-primary-100 hover:bg-[#db6d65] w-full md:max-w-60'
              onClick={() => setOpenReview(true)}
              size='normal'
            >
              Give Review
            </Button>
          ))}
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
