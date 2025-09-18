import { useIsMobile } from '@/lib/useIsMobile';
import { useRef, useState } from 'react';

interface Props {
  images: string[];
}

const RestoImages: React.FC<Props> = ({ images }) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='w-full'>
      {isMobile ? (
        // Mobile carousel
        <div className='w-full'>
          {/* Container scroll horizontal */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className='flex w-full h-65 overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-lg'
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Resto Image ${index + 1}`}
                className='w-full h-full object-cover object-center rounded-lg flex-shrink-0 snap-center'
              />
            ))}
          </div>

          {/* Dots di bawah */}
          <div className='flex justify-center items-center gap-1 mt-3'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-100' : 'bg-[#D9D9D9]'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop grid
        <div className='grid grid-cols-2 gap-2 w-full h-auto pt-12 overflow-hidden rounded-lg'>
          {images[0] && (
            <div className='h-[470px] w-full overflow-hidden rounded-lg'>
              <img
                src={images[0]}
                alt='main'
                className='w-full h-full object-cover object-center rounded-lg'
              />
            </div>
          )}

          <div className='grid grid-rows-3 gap-2 h-[470px] rounded-lg'>
            {images[1] && (
              <div className='h-full row-span-2 w-full overflow-hidden rounded-lg'>
                <img
                  src={images[1]}
                  alt='top'
                  className='w-full h-full object-cover object-center rounded-lg'
                />
              </div>
            )}

            <div className='grid grid-cols-2 gap-2 h-auto overflow-hidden rounded-lg'>
              {images[2] && (
                <div className='h-auto w-full overflow-hidden rounded-lg'>
                  <img
                    src={images[2]}
                    alt='bottom-left'
                    className='w-full h-full object-cover object-center rounded-lg'
                  />
                </div>
              )}
              {images[0] && (
                <div className='h-auto w-full overflow-hidden rounded-lg'>
                  <img
                    src={images[0]}
                    alt='bottom-right'
                    className='w-full h-full object-cover object-center rounded-lg'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestoImages;
