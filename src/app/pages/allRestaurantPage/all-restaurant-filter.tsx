import { Input } from '@/components/ui/input';
import { DISTANCE } from '@/constants/distance-filter';
import { RATING } from '@/constants/rating-filter';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'; // npm i use-debounce

interface AllRestaurantFilterProps {
  onChange: (filters: {
    location: string;
    range?: number; // map dari distance
    priceMin?: number;
    priceMax?: number;
    rating?: number;
  }) => void;
}

const AllRestaurantFilter = ({ onChange }: AllRestaurantFilterProps) => {
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  // Debounce agar tidak terlalu sering memanggil parent
  const [debouncedFilters] = useDebounce(
    { distance, rating, minPrice, maxPrice },
    300
  );

  useEffect(() => {
    onChange({
      location: 'jakarta',
      range: debouncedFilters.distance,
      priceMin: debouncedFilters.minPrice,
      priceMax: debouncedFilters.maxPrice,
      rating: debouncedFilters.rating,
    });
  }, [debouncedFilters, onChange]);

  return (
    <div className='w-66.5 shadow-[0_0_20px_rgba(203,202,202,0.25)] pt-4'>
      <h3 className='text-md font-extrabold text-neutral-950 px-4'>FILTER</h3>
      <div className='flex flex-col divide-y divide-neutral-300'>
        {/* Distance */}
        <div className='flex flex-col gap-2.5 px-4 py-6'>
          <h4 className='text-lg font-extrabold text-neutral-950'>Distance</h4>
          {DISTANCE.map((item) => (
            <div key={item.label} className='flex gap-2 items-center'>
              <input
                type='radio'
                name='distance'
                id={item.label}
                value={item.value}
                checked={distance === Number(item.value)}
                onChange={() => setDistance(Number(item.value))}
              />
              <label htmlFor={item.label}>{item.label}</label>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className='flex flex-col gap-2.5 px-4 py-6'>
          <h4 className='text-lg font-extrabold text-neutral-950'>Price</h4>
          <div className='flex flex-col gap-2.5 items-center'>
            <Input
              type='number'
              placeholder='Minimum Price'
              value={minPrice ?? ''}
              onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}
            />
            <Input
              type='number'
              placeholder='Maximum Price'
              value={maxPrice ?? ''}
              onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}
            />
          </div>
        </div>

        {/* Rating */}
        <div className='flex flex-col gap-2.5 px-4 py-6'>
          <h4 className='text-lg font-extrabold text-neutral-950'>Rating</h4>
          {RATING.map((item) => (
            <div key={item.label} className='flex gap-2 items-center'>
              <input
                type='radio'
                name='rating'
                id={item.label}
                value={item.value}
                checked={rating === Number(item.value)}
                onChange={() => setRating(Number(item.value))}
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
