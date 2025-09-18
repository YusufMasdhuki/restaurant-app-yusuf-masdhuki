'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/cart/useCart';
import { useRemoveCartItem } from '@/hooks/cart/useRemoveCartItem ';
import { useUpdateCartItem } from '@/hooks/cart/useUpdateCartItem ';
import { handleCartItemQuantity } from '@/lib/cart-utils';
import { formatRupiah } from '@/lib/format-rupiah';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MyCartPage = () => {
  const { data: cartData, isLoading, isError } = useCart();
  const navigate = useNavigate();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  if (isLoading)
    return <div className='pt-32 text-center'>Loading cart...</div>;
  if (isError || !cartData?.data)
    return (
      <div className='pt-32 text-center text-red-500'>Failed to load cart</div>
    );

  const { cart } = cartData.data;

  return (
    <div className='bg-neutral-50'>
      <div className='pt-32 max-w-200 mx-auto px-4 pb-25'>
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
                          onClick={() =>
                            handleCartItemQuantity({
                              item,
                              update: (id, payload) =>
                                updateMutation.mutate({ id, payload }),
                              remove: (id) => removeMutation.mutate(id),
                              change: 'decrease',
                            })
                          }
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size='icon'
                          className='bg-primary-100 text-white'
                          onClick={() =>
                            handleCartItemQuantity({
                              item,
                              update: (id, payload) =>
                                updateMutation.mutate({ id, payload }),
                              remove: (id) => removeMutation.mutate(id),
                              change: 'increase',
                            })
                          }
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
                        state: { groups: cart }, // ✅ key harus sama dengan yang diambil di CheckoutPage
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
      </div>
    </div>
  );
};

export default MyCartPage;
