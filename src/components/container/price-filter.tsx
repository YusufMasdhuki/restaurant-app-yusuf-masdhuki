import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '@/store/slices/restaurantFilterSlice';
import { type RootState } from '@/store';
import { z } from 'zod';

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

      // akses issues
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'min') zodErrors.min = err.message;
        if (err.path[0] === 'max') zodErrors.max = err.message;
      });

      setErrors(zodErrors);
    } else {
      setErrors({});
      dispatch(
        setFilters({
          priceMin: parsedMin,
          priceMax: parsedMax,
        })
      );
    }
  };

  return (
    <div className='flex flex-col gap-2.5 items-center px-4'>
      <Input
        type='number'
        placeholder='Minimum Price'
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      {errors.min && <p className='text-red-500 text-sm'>{errors.min}</p>}

      <Input
        type='number'
        placeholder='Maximum Price'
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      {errors.max && <p className='text-red-500 text-sm'>{errors.max}</p>}

      <button
        type='button'
        onClick={applyPriceFilter}
        className='bg-blue-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700 transition'
      >
        Apply
      </button>
    </div>
  );
};

export default PriceFilter;
