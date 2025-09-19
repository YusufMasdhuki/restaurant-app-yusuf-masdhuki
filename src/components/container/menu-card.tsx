import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface Menu {
  id: number;
  image: string;
  foodName: string;
  price: number;
}

interface MenuCardProps {
  menu: Menu;
  quantity: number;
  isAdding: boolean;
  onAdd?: (menu: Menu) => void;
  onIncrease?: (menu: Menu) => void;
  onDecrease?: (menu: Menu) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  menu,
  quantity = 0,
  isAdding,
  onAdd,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className='flex flex-col rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      {/* Gambar */}
      <div className='w-full  h-[172px] md:h-[285px]'>
        <img
          src={menu.image}
          alt={menu.foodName}
          className='w-full h-full object-cover object-center'
        />
      </div>

      {/* Info + Tombol */}
      <div className='p-3 md:p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2'>
        <div>
          <h3 className='font-medium text-sm md:text-md text-neutral-950'>
            {menu.foodName}
          </h3>
          <p className='text-md md:text-lg font-extrabold text-neutral-950'>
            Rp {menu.price.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Kalau belum ada di cart → tampilkan tombol Add */}
        {quantity > 0 ? (
          <div className='flex items-center gap-4 text-md lg:text-lg'>
            <Button
              onClick={() => onDecrease?.(menu)}
              size='icon'
              className='border border-neutral-300 h-9 w-9 md:h-10 md:w-10'
            >
              <Minus />
            </Button>
            <span>{quantity}</span>
            <Button
              onClick={() => onIncrease?.(menu)}
              size='icon'
              className='bg-primary-100 text-white h-9 w-9 md:h-10 md:w-10'
            >
              <Plus />
            </Button>
          </div>
        ) : (
          <Button
            size='md'
            className='w-full md:w-20 h-9 md:h-10 bg-primary-100 text-white disabled:opacity-50'
            disabled={isAdding}
            onClick={() => onAdd?.(menu)}
          >
            {isAdding ? 'Adding...' : 'Add'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
