// src/pages/detailRestoPage.tsx
import MenuCard from '@/components/container/menu-card';
import ReviewCard from '@/components/container/review-card';
import { useAddToCart } from '@/hooks/cart/useAddToCart ';
import { useCart } from '@/hooks/cart/useCart';
import { useRemoveCartItem } from '@/hooks/cart/useRemoveCartItem ';
import { useUpdateCartItem } from '@/hooks/cart/useUpdateCartItem ';
import { useRestoDetail } from '@/hooks/restaurants/useRestoDetail';
import calculateCartByRestaurant from '@/lib/calculateCart';
import type { CartSuccessResponse } from '@/types/cart-type';
import { useNavigate, useParams } from 'react-router-dom';
import CartSummary from './CartSummary';
import MenuTabs from './menu-tabs';
import RestoHeader from './resto-header';
import RestoImages from './resto-images';
import { findCartItem, handleCartItemQuantity } from '@/lib/cart-utils';
import { useEffect } from 'react';

const DetailRestoPage = () => {
  const { id } = useParams<{ id: string }>();
  const restoId = Number(id);
  const navigate = useNavigate();

  const addToCartMutation = useAddToCart();
  const { data: cartData } = useCart();
  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveCartItem();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError, error } = useRestoDetail(restoId, {
    limitMenu: 10,
    limitReview: 6,
  });

  const { totalItems, totalPrice } = calculateCartByRestaurant(
    cartData,
    restoId
  );

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className='flex items-center justify-center h-screen'>
        Error: {error?.message}
      </div>
    );

  const resto = data?.data;

  if (!resto)
    return (
      <div className='flex items-center justify-center h-screen'>
        Restaurant not found
      </div>
    );

  // Ambil quantity dari cart
  const getQuantity = (
    cartData: CartSuccessResponse | undefined,
    menuId: number
  ): number => {
    if (!cartData?.data.cart) return 0;

    for (const group of cartData.data.cart) {
      const found = group.items.find((item) => item.menu.id === menuId);
      if (found) {
        return found.quantity;
      }
    }

    return 0;
  };

  return (
    <div className='pt-20 px-4 max-w-300 mx-auto w-full'>
      {/* Images */}
      <RestoImages images={resto.images} />

      {/* Header */}
      <RestoHeader
        logo={resto.logo}
        name={resto.name}
        averageRating={resto.averageRating}
        place={resto.place}
      />

      {/* Menu Section */}
      <div>
        <h2 className='text-display-xs md:text-display-lg font-extrabold mb-4 md:mb-6 mt-4 md:mt-8'>
          Menu
        </h2>
        <MenuTabs />
        <div className='gap-4 md:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 md:mt-6'>
          {resto.menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              quantity={getQuantity(cartData, menu.id)}
              isAdding={addToCartMutation.isPending}
              onAdd={(item) =>
                addToCartMutation.mutate({
                  restaurantId: resto.id,
                  menuId: item.id,
                  quantity: 1,
                })
              }
              onIncrease={(item) => {
                const cartItem = findCartItem(cartData, item.id);
                if (cartItem) {
                  handleCartItemQuantity({
                    item: cartItem,
                    update: (id, payload) =>
                      updateCartMutation.mutate({ id, payload }),
                    remove: (id) => removeCartMutation.mutate(id),
                    change: 'increase',
                  });
                }
              }}
              onDecrease={(item) => {
                const cartItem = findCartItem(cartData, item.id);
                if (cartItem) {
                  handleCartItemQuantity({
                    item: cartItem,
                    update: (id, payload) =>
                      updateCartMutation.mutate({ id, payload }),
                    remove: (id) => removeCartMutation.mutate(id),
                    change: 'decrease',
                  });
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className='pt-4 md:pt-8 mt-4 md:mt-8 border-t border-neutral-300 mb-10 md:mb-12'>
        <h2 className='text-display-xs md:text-display-lg font-extrabold text-neutral-950 mb-2 md:mb-3'>
          Reviews
        </h2>
        <div className='flex items-center gap-1'>
          <img
            src='/icons/star.svg'
            alt='star'
            className='size-6 md:size-8.5'
          />
          <p className='text-md md:text-xl font-extrabold text-neutral-950'>
            {resto.averageRating} ({resto.totalReviews} ulasan)
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-6'>
          {resto.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={() => navigate('/checkout')}
      />
    </div>
  );
};

export default DetailRestoPage;
