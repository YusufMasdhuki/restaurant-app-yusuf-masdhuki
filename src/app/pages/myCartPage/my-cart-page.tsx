'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/cart/useCart';
import { useUpdateCartItem } from '@/hooks/cart/useUpdateCartItem ';
import { formatRupiah } from '@/lib/format-rupiah';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MyCartPage = () => {
  const { data: cartData, isLoading, isError } = useCart();
  const navigate = useNavigate();
  const updateMutation = useUpdateCartItem();

  if (isLoading)
    return <div className='pt-32 text-center'>Loading cart...</div>;
  if (isError || !cartData?.data)
    return (
      <div className='pt-32 text-center text-red-500'>Failed to load cart</div>
    );

  const { cart, summary } = cartData.data;

  const handleIncrease = (itemId: number, quantity: number) => {
    updateMutation.mutate({ id: itemId, payload: { quantity: quantity + 1 } });
  };

  const handleDecrease = (itemId: number, quantity: number) => {
    if (quantity > 1) {
      updateMutation.mutate({
        id: itemId,
        payload: { quantity: quantity - 1 },
      });
    }
  };

  return (
    <div className='bg-neutral-50'>
      <div className='pt-32 max-w-200 mx-auto px-4'>
        <h1 className='text-display-md font-extrabold mb-8'>My Cart</h1>

        {cart.length === 0 ? (
          <div className='text-center text-gray-500'>Your cart is empty</div>
        ) : (
          <div className='space-y-8'>
            {cart.map((group) => (
              <div
                key={group.restaurant.id}
                className=' rounded-2xl p-5 bg-white'
              >
                {/* Restaurant */}
                <Link
                  to={`/detail-restaurant/${group.restaurant.id}`}
                  className='flex items-center gap-2 mb-4 hover:text-primary-100'
                >
                  <img
                    src='/icons/resto-icon.svg'
                    alt={group.restaurant.name}
                    className='w-8 h-8'
                  />
                  <h2 className='font-bold text-lg'>{group.restaurant.name}</h2>
                  <ChevronRight className='size-6' />
                </Link>

                {/* Items */}
                <div className='flex flex-col gap-5 border-b border-dashed pb-5'>
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-3'>
                        <img
                          src={item.menu.image}
                          alt={item.menu.foodName}
                          className='w-20 h-20 object-cover rounded-xl'
                        />
                        <div>
                          <p className='font-medium text-md'>
                            {item.menu.foodName}
                          </p>
                          <p className='text-lg text-neutral-950 font-extrabold'>
                            {formatRupiah(item.menu.price)}
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-3 items-center'>
                        <Button
                          size='icon'
                          className='bg-primary-100 text-white'
                          onClick={() => handleDecrease(item.id, item.quantity)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size='icon'
                          className='bg-primary-100 text-white'
                          onClick={() => handleIncrease(item.id, item.quantity)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className='flex justify-between items-center mt-5 font-semibold'>
                  <div>
                    <h4 className='text-md font-medium text-neutral-950'>
                      Total
                    </h4>
                    <p className='text-xl font-extrabold text-neutral-950'>
                      {formatRupiah(group.subtotal)}
                    </p>
                  </div>
                  <Button
                    className='bg-primary-100 text-white h-12 w-60'
                    onClick={() =>
                      navigate('/checkout', {
                        state: { group }, // ✅ key harus sama dengan yang diambil di CheckoutPage
                      })
                    }
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
};

export default MyCartPage;
