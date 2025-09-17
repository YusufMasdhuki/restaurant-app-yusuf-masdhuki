import PriceFilter from '@/components/container/price-filter';
import { DISTANCE } from '@/constants/distance-filter';
import { RATING } from '@/constants/rating-filter';
import { type RootState } from '@/store';
import { setFilters } from '@/store/slices/restaurantFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const AllRestaurantFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.restaurantFilter);

  const resetDistance = () => {
    dispatch(setFilters({ range: undefined }));
  };

  const resetRating = () => {
    dispatch(setFilters({ rating: undefined }));
  };

  return (
    <div className='w-66.5 shadow-[0_0_20px_rgba(203,202,202,0.25)] pt-4'>
      <h3 className='text-md font-extrabold text-neutral-950 px-4'>FILTER</h3>
      <div className='flex flex-col divide-y divide-neutral-300'>
        {/* Distance */}
        <div className='flex flex-col gap-2.5 px-4 py-6'>
          <div className='flex justify-between items-center'>
            <h4 className='text-lg font-extrabold text-neutral-950'>
              Distance
            </h4>
            <button
              type='button'
              onClick={resetDistance}
              className='text-sm text-red-500 hover:underline'
            >
              Reset
            </button>
          </div>
          {DISTANCE.map((item) => (
            <div key={item.label} className='flex gap-2 items-center'>
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
        <div className='flex flex-col gap-2.5 px-4 py-6'>
          <div className='flex justify-between items-center'>
            <h4 className='text-lg font-extrabold text-neutral-950'>Rating</h4>
            <button
              type='button'
              onClick={resetRating}
              className='text-sm text-red-500 hover:underline'
            >
              Reset
            </button>
          </div>
          {RATING.map((item) => (
            <div key={item.label} className='flex gap-2 items-center'>
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
                <label
                  htmlFor={item.label}
                  className='text-md text-neutral-950'
                >
                  {item.label}
                </label>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRestaurantFilter;
