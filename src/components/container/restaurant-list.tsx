import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteRestaurants } from '@/hooks/restaurants/useRestaurants';
import type {
  Restaurant,
  GetRestaurantsSuccessResponse,
  GetRestaurantsErrorResponse,
} from '@/types/resto-type';

const RestaurantInfiniteList = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRestaurants({
    limit: 10,
    location: 'Jakarta',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    const errorMessage =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as GetRestaurantsErrorResponse).message
        : 'Unknown error';
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className='max-w-300 w-full mx-auto px-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-display-md font-extrabold text-neutral-950 mb-4'>
          Recommended
        </h2>
        <p className='text-lg font-extrabold text-primary-100'>See All</p>
      </div>
      {data?.pages.flatMap((page: GetRestaurantsSuccessResponse) =>
        page.data.restaurants.map((resto: Restaurant) => (
          <div key={resto.id} className='p-4 border-b'>
            <p className='font-semibold'>{resto.name}</p>
            <p>⭐ {resto.star}</p>
            <img
              src={resto.logo}
              alt={resto.name}
              className='w-40 aspect-square object-cover rounded-md'
            />
          </div>
        ))
      )}

      <div ref={ref} className='py-4 text-center'>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Scroll to load more'
          : 'No more restaurants'}
      </div>
    </div>
  );
};

export default RestaurantInfiniteList;
