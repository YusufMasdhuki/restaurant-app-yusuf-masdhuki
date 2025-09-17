import type { PaymentMethod } from '@/constants/paymentMethods';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';
import { useCartQuantity } from '@/hooks/cart/useCartQuantity';
import type { CartGroup } from '@/types/cart-type';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryAddress from './DeliveryAddress';
import PaymentMethods from './PaymentMethods';
import PaymentSummary from './PaymentSummary';
import RestaurantItems from './RestaurantItems';

const CheckoutPage = () => {
  const location = useLocation();
  const state = location.state as { groups?: CartGroup[] };
  const initialGroups = state?.groups ?? [];

  const { groups, updateQuantity } = useCartQuantity({ initialGroups });
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    PAYMENT_METHODS[0]
  );

  if (groups.length === 0) {
    return <div className='pt-32 text-center'>No items to checkout</div>;
  }

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-250 px-4 pt-32 mx-auto'>
        <h1 className='text-display-md font-extrabold text-neutral-950 mb-6'>
          Checkout
        </h1>
        <div className='flex gap-5'>
          {/* Left */}
          <div className='flex-[7.9] basis-80 space-y-5'>
            <DeliveryAddress />
            {groups.map((group) => (
              <RestaurantItems
                key={group.restaurant.id}
                group={group}
                handleUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Right */}
          <div className='flex-[2.1] basis-80 space-y-5'>
            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
            <PaymentSummary groups={groups} selectedMethod={selectedMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
