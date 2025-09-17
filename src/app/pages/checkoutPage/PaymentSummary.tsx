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
    <div className='shadow-[0_0_20px_rgba(203,202,202,0.25)] bg-white p-5 rounded-2xl'>
      <h2 className='text-lg font-extrabold text-neutral-950 mb-4'>
        Payment Summary
      </h2>
      <div className='flex justify-between mb-2'>
        <span>Price ({totalItems} items)</span>
        <span>{formatRupiah(subtotalAll)}</span>
      </div>

      <div className='flex justify-between mb-2'>
        <span>Delivery Fee</span>
        <span>{formatRupiah(deliveryFee)}</span>
      </div>
      <div className='flex justify-between mb-2'>
        <span>Service Fee</span>
        <span>{formatRupiah(serviceFee)}</span>
      </div>
      <div className='flex justify-between font-semibold text-lg'>
        <span>Total</span>
        <span>{formatRupiah(total)}</span>
      </div>
      <BuyButton
        paymentMethod={selectedMethod?.id ?? ''}
        deliveryAddress={address}
      />
    </div>
  );
};

export default PaymentSummary;
