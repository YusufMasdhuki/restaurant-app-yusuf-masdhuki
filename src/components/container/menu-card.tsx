import { Button } from '@/components/ui/button';

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
    <div className='flex flex-col rounded-lg shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      {/* Gambar */}
      <div className='w-full max-w-[285px] h-[285px]'>
        <img
          src={menu.image}
          alt={menu.foodName}
          className='w-full h-full object-cover rounded-md'
        />
      </div>

      {/* Info + Tombol */}
      <div className='p-4 flex items-center justify-between gap-2'>
        <div>
          <h3 className='font-medium text-md text-neutral-950'>
            {menu.foodName}
          </h3>
          <p className='text-lg font-extrabold text-neutral-950'>
            Rp {menu.price.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Kalau belum ada di cart → tampilkan tombol Add */}
        {quantity > 0 ? (
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => onDecrease?.(menu)}
              size='icon'
              className='bg-primary-100 text-white '
            >
              -
            </Button>
            <span>{quantity}</span>
            <Button
              onClick={() => onIncrease?.(menu)}
              size='icon'
              className='bg-primary-100 text-white'
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            size='md'
            className='w-20 h-10 bg-primary-100 text-white disabled:opacity-50'
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
