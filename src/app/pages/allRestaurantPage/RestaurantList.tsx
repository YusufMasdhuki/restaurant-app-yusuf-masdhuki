import RestoCard from '@/components/container/resto-card';
import { useInfiniteRestaurants } from '@/hooks/restaurants/useRestaurants';
import type { Filters } from '@/store/slices/restaurantFilterSlice';
import { useInView } from 'react-intersection-observer';

interface Props {
  filters: Filters; // atau tipe RootState['restaurantFilter']
}

const RestaurantList: React.FC<Props> = ({ filters }) => {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage) fetchNextPage();
    },
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRestaurants(filters);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className='text-red-500'>{error.message}</p>;

  const restaurants =
    data?.pages.flatMap((page) => page.data.restaurants) ?? [];

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
        {restaurants.map((resto) => (
          <RestoCard
            key={resto.id}
            id={resto.id}
            logo={resto.logo}
            name={resto.name}
            star={resto.star}
            place={resto.place}
            distance={resto.distance}
          />
        ))}
      </div>
      <div ref={ref} className='flex items-center justify-center'>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default RestaurantList;
