import { Button } from '@/components/ui/button';
import { useRestoDetail } from '@/hooks/restaurants/useRestoDetail';
import type { OrderItem, OrderRestaurant } from '@/types/order-type';
import type { RestoMenu } from '@/types/resto-detail-type';
import { Link } from 'react-router-dom';

const OrderRestaurantCard: React.FC<OrderRestaurant> = ({
  restaurantId,
  restaurantName,
  items,
  subtotal,
}) => {
  const { data: restoDetail } = useRestoDetail(restaurantId, {
    limitMenu: 50,
  });
  const menus: RestoMenu[] = restoDetail?.data.menus ?? [];

  return (
    <div className='bg-white rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] p-5'>
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
        <Button className='text-white bg-primary-100 w-60'>Give Review</Button>
      </div>
    </div>
  );
};

export default OrderRestaurantCard;
