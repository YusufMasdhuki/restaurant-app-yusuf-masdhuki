import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import AllRestaurantFilter from './all-restaurant-filter';
import RestaurantList from './RestaurantList';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/lib/useIsMobile';
import { ListFilter } from 'lucide-react';
import { useEffect } from 'react';

const AllRestaurantPage = () => {
  const filters = useSelector((state: RootState) => state.restaurantFilter);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full'>
      <div className='w-full max-w-300 px-4 min-h-screen mx-auto pt-20 md:mt-12 mb-10 md:mb-25 md:pt-20'>
        <h2 className='text-display-xs md:text-display-md font-extrabold text-neutral-950 mb-4 md:mb-8'>
          All Restaurant
        </h2>
        <div className='flex flex-col md:flex-row gap-4 lg:gap-10'>
          {/* Filter bar */}
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-between text-neutral-800 px-4 h-13 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] border-none'
                >
                  <span className='text-sm font-extrabold'>FILTER</span>
                  <ListFilter className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent
                side='left'
                className='w-3/4 bg-white p-0 overflow-y-auto'
              >
                <SheetHeader className='px-4 py-4 relative'>
                  <SheetTitle className='absolute top-5 text-md text-left font-bold text-neutral-950'>
                    Filter
                  </SheetTitle>
                </SheetHeader>
                {/* langsung pake komponen filter */}
                <AllRestaurantFilter />
              </SheetContent>
            </Sheet>
          ) : (
            <AllRestaurantFilter />
          )}

          {/* List restoran */}

          <RestaurantList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default AllRestaurantPage;
