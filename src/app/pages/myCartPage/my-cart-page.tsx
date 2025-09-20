'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/cart/useCart';
import { useRemoveCartItem } from '@/hooks/cart/useRemoveCartItem ';
import { useUpdateCartItem } from '@/hooks/cart/useUpdateCartItem ';
import { handleCartItemQuantity } from '@/lib/cart-utils';
import { formatRupiah } from '@/lib/format-rupiah';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyCartPage = () => {
  const { data: cartData, isLoading, isError } = useCart();
  const navigate = useNavigate();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Loading...</p>
      </div>
    );
  if (isError || !cartData?.data)
    return (
      <div className='pt-32 flex items-center justify-center h-[70vh] text-center text-red-500'>
        Failed to load cart
      </div>
    );

  const { cart } = cartData.data;

  return (
    <div className='bg-neutral-50 text-neutral-950'>
      <div className='pt-20 md:pt-32 max-w-200 mx-auto px-4 pb-10 md:pb-25'>
        <h1 className='text-display-xs md:text-display-md font-extrabold mb-4 md:mb-8'>
          My Cart
        </h1>

        {cart.length === 0 ? (
          <div className='text-center flex items-center justify-center text-lg md:text-display-xs h-[70vh] text-primary-950'>
            Your cart is empty
          </div>
        ) : (
          <div className='space-y-5'>
            {cart.map((group) => (
              <div
                key={group.restaurant.id}
                className=' rounded-2xl p-4 md:p-5 bg-white shadow-[0_0_20px_rgba(203,202,202,0.25)]'
              >
                {/* Restaurant */}
                <Link
                  to={`/detail-restaurant/${group.restaurant.id}`}
                  className='flex items-center gap-1 md:gap-2 mb-3 md:mb-4 hover:text-primary-100'
                >
                  <img
                    src='/icons/resto-icon.svg'
                    alt={group.restaurant.name}
                    className='w-8 h-8'
                  />
                  <h2 className='font-bold text-md md:text-lg'>
                    {group.restaurant.name}
                  </h2>
                  <ChevronRight className='size-5 md:size-6' />
                </Link>

                {/* Items */}
                <div className='flex flex-col gap-3 md:gap-5 border-b border-dashed pb-3 md:pb-5'>
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-4'>
                        <img
                          src={item.menu.image}
                          alt={item.menu.foodName}
                          className='size-16 md:size-20 object-cover rounded-xl'
                        />
                        <div>
                          <p className='font-medium text-sm md:text-md'>
                            {item.menu.foodName}
                          </p>
                          <p className='text-md md:text-lg text-neutral-950 font-extrabold'>
                            {formatRupiah(item.menu.price)}
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-2 md:gap-4 items-center'>
                        <Button
                          size='icon'
                          className='bg-white border border-neutral-300'
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
                          <Minus className='size-5 md:size-6' />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size='icon'
                          className='bg-primary-100 hover:bg-[#db6d65] text-white'
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
                          <Plus className='size-5 md:size-6' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className='flex flex-col md:flex-row md:justify-between md:items-center mt-3 md:mt-5 font-semibold'>
                  <div>
                    <h4 className='text-sm md:text-md font-medium text-neutral-950'>
                      Total
                    </h4>
                    <p className='text-lg md:text-xl font-extrabold text-neutral-950'>
                      {formatRupiah(group.subtotal)}
                    </p>
                  </div>
                  <Button
                    className='bg-primary-100 hover:bg-[#db6d65] text-white h-11 md:h-12 w-full md:w-60 mt-3 md:mt-0'
                    onClick={() =>
                      navigate('/checkout', {
                        state: { groups: cart },
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
