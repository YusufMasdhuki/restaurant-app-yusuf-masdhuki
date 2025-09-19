import PriceFilter from '@/components/container/price-filter';
import { Button } from '@/components/ui/button';
import { DISTANCE } from '@/constants/distance-filter';
import { RATING } from '@/constants/rating-filter';
import { useIsMobile } from '@/lib/useIsMobile';
import { type RootState } from '@/store';
import { setFilters } from '@/store/slices/restaurantFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const AllRestaurantFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.restaurantFilter);
  const isMobile = useIsMobile();

  const resetDistance = () => {
    dispatch(setFilters({ range: undefined }));
  };

  const resetRating = () => {
    dispatch(setFilters({ rating: undefined }));
  };

  return (
    <div className='md:max-w-66.5 w-full'>
      <div className='w-full md:shadow-[0_0_20px_rgba(203,202,202,0.25)] p-4'>
        {!isMobile && (
          <h3 className='text-md font-extrabold text-neutral-950'>FILTER</h3>
        )}
        <div className='flex flex-col divide-y divide-neutral-300'>
          {/* Distance */}
          <div className='flex flex-col gap-2.5 pt-2.5 pb-3 md:pb-6'>
            <div className='flex justify-between items-center'>
              <h4 className='text-md md:text-lg font-extrabold text-neutral-950'>
                Distance
              </h4>
              <Button
                variant='underline'
                size='normal'
                onClick={resetDistance}
                className='text-sm font-medium text-red-500 hover:underline'
              >
                Reset
              </Button>
            </div>
            {DISTANCE.map((item) => (
              <div
                key={item.label}
                className='flex gap-2 items-center text-sm md:text-md'
              >
                <input
                  type='radio'
                  name='distance'
                  id={item.label}
                  value={item.value}
                  checked={filters.range === Number(item.value)}
                  onChange={() =>
                    dispatch(setFilters({ range: Number(item.value) }))
                  }
                />
                <label htmlFor={item.label}>{item.label}</label>
              </div>
            ))}
          </div>

          {/* Price */}
          <PriceFilter />

          {/* Rating */}
          <div className='flex flex-col gap-2.5 py-3 md:py-6'>
            <div className='flex justify-between items-center'>
              <h4 className='text-md md:text-lg font-extrabold text-neutral-950'>
                Rating
              </h4>
              <Button
                variant='underline'
                size='normal'
                onClick={resetRating}
                className='text-sm font-medium text-red-500 hover:underline'
              >
                Reset
              </Button>
            </div>
            {RATING.map((item) => (
              <div
                key={item.label}
                className='flex gap-1 md:gap-2 items-center text-sm md:text-md'
              >
                <input
                  type='radio'
                  name='rating'
                  id={item.label}
                  value={item.value}
                  checked={filters.rating === Number(item.value)}
                  onChange={() =>
                    dispatch(setFilters({ rating: Number(item.value) }))
                  }
                />
                <span className='flex gap-0.5 items-center'>
                  <img src='icons/star.svg' alt='star' className='size-6' />
                  <label htmlFor={item.label} className=' text-neutral-950'>
                    {item.label}
                  </label>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurantFilter;
