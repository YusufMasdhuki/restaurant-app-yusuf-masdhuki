import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HeroProps {
  onSearch: (keyword: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  return (
    <section className='relative min-h-[648px]'>
      <img
        src='/images/hero-image.png'
        alt='hero'
        className='w-full object-cover  min-h-[648px] z-0'
      />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center z-10'>
        <h1 className='text-display-lg md:text-display-2xl font-extrabold text-white mb-2'>
          Explore Culinary Experiences
        </h1>
        <p className='md:text-display-xs text-lg font-bold text-white mb-10'>
          Search and refine your choice to discover the perfect restaurant.
        </p>
        <div className='relative mx-auto max-w-151'>
          <Search className='absolute left-4 md:left-6 text-neutral-500 top-1/2 -translate-y-1/2 cursor-pointer size-5' />
          <Input
            placeholder='Search restaurants, food and drink'
            className='w-full max-w-151 h-12 md:h-14 pl-10.5 md:pl-12.5 bg-white rounded-full mx-auto text-sm md:text-md'
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div
        className='absolute bottom-0 left-0 right-0 w-full h-full z-5 
        bg-gradient-to-t from-black/80 to-transparent'
      />
    </section>
  );
};

export default Hero;
