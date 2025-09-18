import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/services/cart/service';

import DeliveryAddress from './DeliveryAddress';
import PaymentMethods from './PaymentMethods';
import PaymentSummary from './PaymentSummary';
import RestaurantItems from './RestaurantItems';

import { PAYMENT_METHODS } from '@/constants/paymentMethods';
import type { PaymentMethod } from '@/constants/paymentMethods';
import type { CartItem, CartSuccessResponse } from '@/types/cart-type';
import { useUpdateCartItem } from '@/hooks/cart/useUpdateCartItem ';
import { useRemoveCartItem } from '@/hooks/cart/useRemoveCartItem ';
import { useState } from 'react';
import { handleCartItemQuantity } from '@/lib/cart-utils';

const CheckoutPage = () => {
  // Ambil data cart dari query
  const { data: cartData } = useQuery<CartSuccessResponse>({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  // Mutations
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: removeCartItem } = useRemoveCartItem();

  // State payment method
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    PAYMENT_METHODS[0]
  );

  // Handler untuk increase/decrease/remove
  const onQuantityChange = (
    item: CartItem,
    change: 'increase' | 'decrease'
  ) => {
    handleCartItemQuantity({
      item,
      update: (id, payload) => updateCartItem({ id, payload }),
      remove: removeCartItem,
      change,
    });
  };

  if (!cartData?.data.cart || cartData.data.cart.length === 0) {
    return <div className='pt-32 text-center'>No items to checkout</div>;
  }

  return (
    <div className='bg-neutral-50'>
      <div className='max-w-250 px-4 pt-32 mx-auto pb-25'>
        <h1 className='text-display-md font-extrabold text-neutral-950 mb-6'>
          Checkout
        </h1>
        <div className='flex gap-5'>
          {/* Left */}
          <div className='flex-[7.9] basis-80 space-y-5'>
            <DeliveryAddress />
            {cartData.data.cart.map((group) => (
              <RestaurantItems
                key={group.restaurant.id}
                group={group}
                handleUpdateQuantity={onQuantityChange}
              />
            ))}
          </div>

          {/* Right */}
          <div className='flex-[2.1] basis-80 '>
            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod} // atau (m) => setSelectedMethod(m)
            />
            <PaymentSummary
              groups={cartData.data.cart}
              selectedMethod={selectedMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
