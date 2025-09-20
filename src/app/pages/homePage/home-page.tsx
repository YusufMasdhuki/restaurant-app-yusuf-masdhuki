// HomePage.tsx
import RestoCard from '@/components/container/resto-card';
import { useInfiniteRestaurants } from '@/hooks/restaurants/useRestaurants';
import type { RootState } from '@/store';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Hero from './hero';
import RecommendedResto from './recommended-resto';
import RestaurantFilters from './restaurant-filters';

const HomePage = () => {
  const [search, setSearch] = useState('');

  // ambil filters dari redux
  const filters = useSelector((state: RootState) => state.restaurantFilter);

  // fetch dari API berdasarkan filters (tanpa search)
  const { data, isLoading, isError, error } = useInfiniteRestaurants(filters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // flatten pages jadi array restoran
  const apiRestaurants = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.restaurants) ?? [];
  }, [data?.pages]);

  // filter front-end untuk search
  const filteredRestaurants = useMemo(() => {
    if (!search) return apiRestaurants;
    return apiRestaurants.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [apiRestaurants, search]);

  return (
    <>
      <Hero onSearch={setSearch} />
      <RestaurantFilters />
      {isLoading ? (
        <p className='text-center mt-6'>Loading...</p>
      ) : isError ? (
        <p className='text-center mt-6 text-red-500'>{error.message}</p>
      ) : search || filteredRestaurants.length !== apiRestaurants.length ? (
        filteredRestaurants.length > 0 ? (
          <div className=' max-w-300 mx-auto px-4 mb-25'>
            <h2 className='text-display-md font-extrabold text-neutral-950 mb-8'>
              Search Result
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredRestaurants.map((resto) => (
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
        ) : (
          <p className='text-center mt-6'>No results found</p>
        )
      ) : (
        <RecommendedResto />
      )}
    </>
  );
};

export default HomePage;
