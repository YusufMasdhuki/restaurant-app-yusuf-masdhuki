// src/pages/detailRestoPage.tsx
import MenuCard from '@/components/container/menu-card';
import ReviewCard from '@/components/container/review-card';
import { useAddToCart } from '@/hooks/cart/useAddToCart ';
import { useCart } from '@/hooks/cart/useCart';
import { useCartQuantity } from '@/hooks/cart/useCartQuantity';
import { useRestoDetail } from '@/hooks/restaurants/useRestoDetail';
import { useParams } from 'react-router-dom';
import CartSummary from './CartSummary';
import MenuTabs from './menu-tabs';
import RestoHeader from './resto-header';
import RestoImages from './resto-images';

const DetailRestoPage = () => {
  const { id } = useParams<{ id: string }>();
  const restoId = Number(id);

  const addToCartMutation = useAddToCart();
  const { data: cartData } = useCart();

  // ✅ selalu panggil hook, gunakan fallback []
  const { groups, increase, decrease } = useCartQuantity({
    initialGroups: cartData?.data?.cart ?? [],
  });

  const { data, isLoading, isError, error } = useRestoDetail(restoId, {
    limitMenu: 10,
    limitReview: 6,
  });

  // hitung total by resto dari groups, bukan dari cartData langsung
  const restoGroup = groups.find((g) => g.restaurant.id === restoId);
  const totalItems =
    restoGroup?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const totalPrice = restoGroup?.subtotal ?? 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const resto = data?.data;
  if (!resto) return <div>Restoran tidak ditemukan</div>;

  // ✅ ambil quantity langsung dari groups
  const getQuantity = (menuId: number) => {
    const group = groups.find((g) => g.restaurant.id === restoId);
    const item = group?.items.find((i) => i.menu.id === menuId);
    return item?.quantity ?? 0;
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
        <h2 className='text-display-lg font-extrabold mb-6 mt-8'>Menu</h2>
        <MenuTabs />
        <div className='gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {resto.menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              quantity={getQuantity(menu.id)}
              isAdding={addToCartMutation.isPending}
              onAdd={(item) =>
                addToCartMutation.mutate({
                  restaurantId: resto.id,
                  menuId: item.id,
                  quantity: 1,
                })
              }
              onIncrease={() => increase(menu.id)}
              onDecrease={() => decrease(menu.id)}
            />
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className='pt-8 mt-8 border-t border-neutral-300 mb-12'>
        <h2 className='text-display-lg font-extrabold text-neutral-950 mb-3'>
          Reviews
        </h2>
        <div className='flex items-center gap-1'>
          <img src='/icons/star.svg' alt='star' className='size-8.5' />
          <p className='text-xl font-extrabold text-neutral-950'>
            {resto.averageRating} ({resto.totalReviews} ulasan)
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
          {resto.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={() => {
          // contoh: redirect ke checkout
          console.log('Checkout resto:', restoId);
        }}
      />
    </div>
  );
};

export default DetailRestoPage;
