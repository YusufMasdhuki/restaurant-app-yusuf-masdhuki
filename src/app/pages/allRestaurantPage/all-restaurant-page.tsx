import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import AllRestaurantFilter from './all-restaurant-filter';
import RestaurantList from './RestaurantList';

const AllRestaurantPage = () => {
  const filters = useSelector((state: RootState) => state.restaurantFilter);

  return (
    <div className='w-full'>
      <div className='w-full max-w-300 px-4 min-h-screen mx-auto mt-12 mb-25 pt-24'>
        <h2 className='text-display-md font-extrabold text-neutral-950 mb-8'>
          All Restaurant
        </h2>
        <div className='flex flex-col lg:flex-row gap-10'>
          {/* Filter bar tetap stabil */}
          <div className='w-full lg:w-1/4'>
            <AllRestaurantFilter />
          </div>
          <div className='w-full lg:w-3/4'>
            {/* List restoran */}
            <RestaurantList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurantPage;
