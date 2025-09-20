import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/format-rupiah';
import type { CartGroup, CartItem } from '@/types/cart-type';
import { Minus, Plus } from 'lucide-react';
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
    <div className='shadow-[0_0_20px_rgba(203,202,202,0.25)] bg-white p-4 md:p-5 rounded-2xl flex flex-col gap-3 md:gap-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1 md:gap-2'>
          <img
            src='/icons/resto-icon.svg'
            alt='resto-icon'
            className='w-8 h-8'
          />
          <h2 className='font-bold text-md md:text-lg'>
            {group.restaurant.name}
          </h2>
        </div>
        <Button
          className='h-9 w-25 md:h-10 md:w-30 border border-neutral-300'
          size='normal'
          onClick={() => navigate(`/detail-restaurant/${group.restaurant.id}`)}
        >
          Add item
        </Button>
      </div>

      {/* Items */}
      {group.items.map((item) => (
        <div key={item.id} className='flex items-center justify-between'>
          {/* Item Info */}
          <div className='flex items-center gap-4'>
            <img
              src={item.menu.image}
              alt={item.menu.foodName}
              className='size-16 md:size-20 object-cover rounded-xl'
            />
            <div>
              <p className='font-medium text-sm md:text-md'>
                {item.menu.foodName}
              </p>
              <p className='text-md md:text-lg text-neutral-950 font-extrabold'>
                {formatRupiah(item.menu.price)}
              </p>
            </div>
          </div>

          {/* Quantity Control */}
          <div className='flex items-center gap-2 lg:gap-4'>
            <Button
              size='icon'
              onClick={() => handleUpdateQuantity(item, 'decrease')}
              className='bg-white border border-neutral-300'
            >
              <Minus className='size-5 md:size-6' />
            </Button>
            <span>{item.quantity}</span>
            <Button
              size='icon'
              className='bg-primary-100 hover:bg-[#db6d65] text-white'
              onClick={() => handleUpdateQuantity(item, 'increase')}
            >
              <Plus className='size-5 md:size-6' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantItems;
