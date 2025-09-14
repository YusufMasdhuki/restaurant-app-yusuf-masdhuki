import { RESTAURANT_FILTERS } from '@/constants/restaurant-filters';

const RestaurantFilters = () => {
  return (
    <div className='flex justify-center items-center w-full max-w-300 mx-auto gap-10 px-4 my-12'>
      {RESTAURANT_FILTERS.map((filter) => (
        <div
          key={filter.label}
          className='flex flex-col items-center gap-1.5 w-full'
        >
          <div className='flex items-center justify-center w-full shadow-[0_0_20px_rgba(203,202,202,0.25)] rounded-md h-25'>
            <img src={filter.icon} alt={filter.label} className='w-[65px]' />
          </div>
          <p className='text-lg font-bold text-neutral-950'>{filter.label}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantFilters;
