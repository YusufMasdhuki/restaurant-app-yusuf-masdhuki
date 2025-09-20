import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '@/store/slices/restaurantFilterSlice';
import { type RootState } from '@/store';
import { z } from 'zod';
import { Button } from '../ui/button';

const priceSchema = z
  .object({
    min: z
      .number()
      .nonnegative({ message: 'Minimum price harus >= 0' })
      .optional(),
    max: z
      .number()
      .nonnegative({ message: 'Maximum price harus >= 0' })
      .optional(),
  })
  .refine((data) => !data.min || !data.max || data.min <= data.max, {
    message: 'Minimum price tidak boleh lebih besar dari Maximum price',
    path: ['max'],
  });

const PriceFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.restaurantFilter);

  const [minPrice, setMinPrice] = useState(filters.priceMin ?? '');
  const [maxPrice, setMaxPrice] = useState(filters.priceMax ?? '');
  const [errors, setErrors] = useState<{ min?: string; max?: string }>({});

  const applyPriceFilter = () => {
    const parsedMin = minPrice !== '' ? Number(minPrice) : undefined;
    const parsedMax = maxPrice !== '' ? Number(maxPrice) : undefined;

    const result = priceSchema.safeParse({ min: parsedMin, max: parsedMax });

    if (!result.success) {
      const zodErrors: { min?: string; max?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'min') zodErrors.min = err.message;
        if (err.path[0] === 'max') zodErrors.max = err.message;
      });
      setErrors(zodErrors);
    } else {
      setErrors({});
      dispatch(setFilters({ priceMin: parsedMin, priceMax: parsedMax }));
    }
  };

  const resetPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setErrors({});
    dispatch(setFilters({ priceMin: undefined, priceMax: undefined }));
  };

  return (
    <div className='flex flex-col gap-2.5 py-3 md:py-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-md md:text-lg font-extrabold text-neutral-950'>
          Price
        </h3>
        <Button
          variant='underline'
          size='normal'
          onClick={resetPriceFilter}
          className='text-sm font-medium text-red-500 hover:underline'
        >
          Reset
        </Button>
      </div>
      <div className='relative text-sm md:text-md'>
        <label
          htmlFor='min'
          className='absolute top-1.25 md:top-2 left-2 size-9.5 bg-neutral-100 flex items-center justify-center rounded-xs'
        >
          Rp
        </label>
        <Input
          type='number'
          id='min'
          placeholder='Minimum Price'
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className='h-12 md:h-13.5 pl-13.5 rounded-md'
        />
        {errors.min && <p className='text-red-500 text-sm'>{errors.min}</p>}
      </div>
      <div className='relative text-sm md:text-md'>
        <label
          htmlFor='max'
          className='absolute top-1.25 md:top-2 left-2 size-9.5 bg-neutral-100 flex items-center justify-center rounded-xs'
        >
          Rp
        </label>
        <Input
          type='number'
          id='max'
          placeholder='Maximum Price'
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className='h-12 md:h-13.5 pl-13.5 rounded-md'
        />
        {errors.max && <p className='text-red-500 text-sm'>{errors.max}</p>}
      </div>

      <Button
        type='button'
        onClick={applyPriceFilter}
        className='bg-primary-100 hover:bg-[#db6d65] text-white'
      >
        Apply
      </Button>
    </div>
  );
};

export default PriceFilter;
