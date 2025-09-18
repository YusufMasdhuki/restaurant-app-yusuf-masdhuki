import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/format-rupiah';
import type { CartGroup, CartItem } from '@/types/cart-type';
import { useNavigate } from 'react-router-dom';

interface RestaurantItemsProps {
  group: CartGroup;
  handleUpdateQuantity: (
    item: CartItem,
    change: 'increase' | 'decrease'
  ) => void;
}

const RestaurantItems = ({
  group,
  handleUpdateQuantity,
}: RestaurantItemsProps) => {
  const navigate = useNavigate();

  return (
    <div className='shadow bg-white p-5 rounded-2xl flex flex-col gap-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src='/icons/resto-icon.svg'
            alt='resto-icon'
            className='w-8 h-8'
          />
          <h2 className='font-bold text-lg'>{group.restaurant.name}</h2>
        </div>
        <Button
          className='h-10 w-30 border border-neutral-300'
          onClick={() => navigate(`/detail-restaurant/${group.restaurant.id}`)}
        >
          Add item
        </Button>
      </div>

      {/* Items */}
      {group.items.map((item) => (
        <div key={item.id} className='flex items-center justify-between'>
          {/* Item Info */}
          <div className='flex items-center gap-3'>
            <img
              src={item.menu.image}
              alt={item.menu.foodName}
              className='w-20 h-20 object-cover rounded-xl'
            />
            <div>
              <p className='font-medium text-md'>{item.menu.foodName}</p>
              <p className='text-lg text-neutral-950 font-extrabold'>
                {formatRupiah(item.menu.price)}
              </p>
            </div>
          </div>

          {/* Quantity Control */}
          <div className='flex items-center gap-2'>
            <Button
              size='icon'
              onClick={() => handleUpdateQuantity(item, 'decrease')}
            >
              -
            </Button>
            <span className='min-w-[32px] text-center'>{item.quantity}</span>
            <Button
              size='icon'
              className='bg-primary-100 text-white'
              onClick={() => handleUpdateQuantity(item, 'increase')}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantItems;
