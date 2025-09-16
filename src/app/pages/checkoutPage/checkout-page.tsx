import type { CartGroup } from '@/types/cart-type';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantItems from './RestaurantItems';
import DeliveryAddress from './DeliveryAddress';
import PaymentMethods from './PaymentMethods';
import PaymentSummary from './PaymentSummary';
import { PAYMENT_METHODS } from '@/constants/paymentMethods';
import type { PaymentMethod } from '@/constants/paymentMethods';

const CheckoutPage = () => {
  const location = useLocation();
  const state = location.state as { group?: CartGroup };
  const initialGroup = state?.group;

  const [group, setGroup] = useState<CartGroup | null>(initialGroup ?? null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    PAYMENT_METHODS[0] // default ke bank pertama
  );

  const handleUpdateQuantity = (itemId: number, newQty: number) => {
    if (!group) return;
    const updatedItems = group.items.map((i) =>
      i.id === itemId
        ? {
            ...i,
            quantity: Math.max(newQty, 1),
            itemTotal: i.menu.price * Math.max(newQty, 1),
          }
        : i
    );
    const newSubtotal = updatedItems.reduce((sum, i) => sum + i.itemTotal, 0);
    setGroup({ ...group, items: updatedItems, subtotal: newSubtotal });
  };

  if (!group) {
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
            <RestaurantItems
              group={group}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          </div>

          {/* Right */}
          <div className='flex-[2.1] basis-80 space-y-5'>
            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
            <PaymentSummary group={group} selectedMethod={selectedMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
