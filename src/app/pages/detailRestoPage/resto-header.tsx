import { Button } from '@/components/ui/button';
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
  return (
    <div className='flex justify-between items-center w-full border-b border-neutral-300 py-8'>
      <div className='flex gap-4 items-center'>
        <img
          src={logo}
          alt={name}
          className='w-30 h-30 object-cover rounded-full'
        />
        <div>
          <h1 className='text-display-md font-extrabold text-neutral-950'>
            {name}
          </h1>
          <div className='flex items-center gap-1'>
            <img src='/icons/star.svg' alt='star' className='size-6' />
            <p className='text-lg font-semibold text-neutral-950'>
              {averageRating}
            </p>
          </div>
          <p className='text-lg text-neutral-950 font-medium'>{place}</p>
        </div>
      </div>
      <Button className='flex items-center justify-center border w-35 border-neutral-300 gap-3'>
        <Share2 className='size-6' />
        Share
      </Button>
    </div>
  );
};

export default RestoHeader;
