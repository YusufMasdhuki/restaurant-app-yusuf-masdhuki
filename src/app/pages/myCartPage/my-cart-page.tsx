'use client';

import { useCart } from '@/hooks/cart/useCart';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/format-rupiah';

const MyCartPage = () => {
  const { data: cartData, isLoading, isError } = useCart();

  if (isLoading) {
    return <div className='pt-32 text-center'>Loading cart...</div>;
  }

  if (isError || !cartData?.data) {
    return (
      <div className='pt-32 text-center text-red-500'>Failed to load cart</div>
    );
  }

  const { cart, summary } = cartData.data;

  return (
    <div className='pt-32 max-w-4xl mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-6'>My Cart</h1>

      {/* List group per restaurant */}
      {cart.length === 0 ? (
        <div className='text-center text-gray-500'>Your cart is empty</div>
      ) : (
        <div className='space-y-8'>
          {cart.map((group) => (
            <div
              key={group.restaurant.id}
              className='border rounded-xl p-4 shadow-sm bg-white'
            >
              {/* Restaurant Info */}
              <div className='flex items-center gap-3 mb-4'>
                <img
                  src={group.restaurant.logo}
                  alt={group.restaurant.name}
                  className='w-12 h-12 object-cover rounded-full border'
                />
                <h2 className='font-semibold text-lg'>
                  {group.restaurant.name}
                </h2>
              </div>

              {/* Items */}
              <div className='space-y-3'>
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between border-b pb-2'
                  >
                    <div className='flex items-center gap-3'>
                      <img
                        src={item.menu.image}
                        alt={item.menu.foodName}
                        className='w-16 h-16 object-cover rounded-lg'
                      />
                      <div>
                        <p className='font-medium'>{item.menu.foodName}</p>
                        <p className='text-sm text-gray-500'>
                          {item.quantity} × {formatRupiah(item.menu.price)}
                        </p>
                      </div>
                    </div>
                    <p className='font-semibold'>
                      {formatRupiah(item.itemTotal)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className='flex justify-between mt-4 font-semibold'>
                <span>Subtotal</span>
                <span>{formatRupiah(group.subtotal)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {summary.totalItems > 0 && (
        <div className='mt-10 border-t pt-6'>
          <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
          <div className='flex justify-between mb-2'>
            <span>Total Items</span>
            <span>{summary.totalItems}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Restaurant Count</span>
            <span>{summary.restaurantCount}</span>
          </div>
          <div className='flex justify-between font-semibold text-lg'>
            <span>Total Price</span>
            <span>{formatRupiah(summary.totalPrice)}</span>
          </div>

          <Button className='w-full mt-6'>Proceed to Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default MyCartPage;
