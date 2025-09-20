import BuyButton from '@/components/container/buy-button';
import type { PaymentMethod } from '@/constants/paymentMethods';
import { formatRupiah } from '@/lib/format-rupiah';
import { useAppSelector } from '@/store/hooks';
import type { CartGroup } from '@/types/cart-type';

interface Props {
  groups: CartGroup[];
  selectedMethod: PaymentMethod | null;
}

const PaymentSummary: React.FC<Props> = ({ groups, selectedMethod }) => {
  const address = useAppSelector((state) => state.delivery.address);

  const deliveryFee = selectedMethod?.deliveryFee ?? 0;
  const serviceFee = selectedMethod?.serviceFee ?? 0;

  // Hitung subtotal semua grup
  const subtotalAll = groups.reduce((sum, g) => sum + g.subtotal, 0);
  const totalItems = groups.reduce(
    (sum, g) => sum + g.items.reduce((s, i) => s + i.quantity, 0),
    0
  );

  const total = subtotalAll + deliveryFee + serviceFee;

  return (
    <div className='relative bg-white p-4 md:p-5 rounded-b-2xl'>
      <div className='absolute top-0 left-0 w-2.5 h-2.5 bg-neutral-100 rounded-br-full' />
      <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-neutral-100 rounded-bl-full' />
      <div className='flex flex-col gap-3 md:gap-4'>
        <h2 className='text-md md:text-lg font-extrabold text-neutral-950'>
          Payment Summary
        </h2>
        <div className='flex justify-between items-center'>
          <span className='text-sm md:text-md font-medium'>
            Price ({totalItems} items)
          </span>
          <span className='text-sm md:text-md font-bold'>
            {formatRupiah(subtotalAll)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm md:text-md font-medium'>Delivery Fee</span>
          <span className='text-sm md:text-md font-bold'>
            {formatRupiah(deliveryFee)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm md:text-md font-medium'>Service Fee</span>
          <span className='text-sm md:text-md font-bold'>
            {formatRupiah(serviceFee)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-md md:text-lg'>Total</span>
          <span className='text-md md:text-lg font-extrabold'>
            {formatRupiah(total)}
          </span>
        </div>
        <BuyButton
          paymentMethod={selectedMethod?.id ?? ''}
          deliveryAddress={address}
        />
      </div>
    </div>
  );
};

export default PaymentSummary;
