import RestoCard from '@/components/container/resto-card';
import { useRecommendedRestaurants } from '@/hooks/restaurants/useRecommendedRestaurants ';
import { useNavigate } from 'react-router-dom';

const RecommendedResto = () => {
  const { data, isLoading, isError, error } = useRecommendedRestaurants();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className='text-red-500'>{error.message}</p>;

  const recommendations = data?.data.recommendations ?? [];

  return (
    <div className=' w-full max-w-300 mx-auto px-4 mb-25 pt-6 md:pt-0'>
      <div className='flex justify-between items-center md:mb-8 mb-4'>
        <h2 className='text-display-xs md:text-display-md font-extrabold text-neutral-950'>
          Recommended
        </h2>
        <button
          className='text-primary-100 text-md md:text-lg font-extrabold cursor-pointer hover:underline'
          onClick={() => navigate('/all-restaurant')}
        >
          See all
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5'>
        {recommendations.map((resto) => (
          <RestoCard
            key={resto.id}
            id={resto.id}
            logo={resto.logo}
            name={resto.name}
            star={resto.star}
            place={resto.place}
            //  distance={resto.distance} // kalau ada di API
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedResto;
