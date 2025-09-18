import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/lib/useIsMobile';
import { Share2 } from 'lucide-react';

interface RestoHeaderProps {
  logo: string;
  name: string;
  averageRating: number;
  place: string;
}

const RestoHeader: React.FC<RestoHeaderProps> = ({
  logo,
  name,
  averageRating,
  place,
}) => {
  const isMobile = useIsMobile(); // default breakpoint 768px

  return (
    <div className='flex justify-between items-center w-full border-b border-neutral-300 py-4 md:py-8'>
      <div className='flex gap-2 md:gap-4 items-center'>
        <img
          src={logo}
          alt={name}
          className='md:size-30 size-22.5 object-cover rounded-full'
        />
        <div>
          <h1 className='md:text-display-md text-md font-extrabold text-neutral-950'>
            {name}
          </h1>
          <div className='flex items-center gap-1'>
            <img src='/icons/star.svg' alt='star' className='size-6' />
            <p className='text-sm md:text-lg font-semibold text-neutral-950'>
              {averageRating}
            </p>
          </div>
          <p className='text-sm md:text-lg text-neutral-950 font-medium'>
            {place}
          </p>
        </div>
      </div>
      <Button
        size='normal'
        className='flex items-center justify-center border w-11 h-11 md:w-35 border-neutral-300 gap-3'
      >
        <Share2 className='md:size-6 size-5' />
        {!isMobile && <span className='text-md'>Share</span>}
      </Button>
    </div>
  );
};

export default RestoHeader;
