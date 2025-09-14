import { useInfiniteRestaurants } from '@/hooks/restaurants/useRestaurants';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AllRestaurantFilter from './all-restaurant-filter';
import RestoCard from '@/components/container/resto-card';
import { useDebounce } from 'use-debounce'; // npm i use-debounce

interface Filters {
  location: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
}

const AllRestaurantPage = () => {
  const [filters, setFilters] = useState<Filters>({
    location: 'jakarta',
    range: undefined,
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
  });

  // Debounce agar filter stabil sebelum fetch
  const [debouncedFilters] = useDebounce(filters, 300);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRestaurants(debouncedFilters);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className='text-red-500'>{error.message}</p>;

  const restaurants =
    data?.pages.flatMap((page) => page.data.restaurants) ?? [];

  return (
    <div className='w-full'>
      <div className='w-full max-w-300 min-h-screen mx-auto mt-12 mb-25 pt-24'>
        <h2 className='text-display-md font-extrabold text-neutral-950 mb-8'>
          All Restaurant
        </h2>

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Filter */}
          <div className='w-full lg:w-1/4'>
            <AllRestaurantFilter onChange={setFilters} />
          </div>

          {/* List restoran */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-3/4'>
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
        </div>

        {/* Loader untuk infinite scroll */}
        <div ref={ref} className='h-12 flex items-center justify-center mt-6'>
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
};

export default AllRestaurantPage;
