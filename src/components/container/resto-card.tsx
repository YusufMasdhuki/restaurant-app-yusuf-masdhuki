// src/components/restaurants/RestoCard.tsx
import React from 'react';

interface RestoCardProps {
  id: string | number;
  logo: string;
  name: string;
  star: number;
  place: string;
  distance?: number; // opsional kalau data API ada
}

import { useNavigate } from 'react-router-dom';

const RestoCard: React.FC<RestoCardProps> = ({
  id,
  logo,
  name,
  star,
  place,
  distance = '-',
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail-restaurant/${id}`)}
      className='rounded-2xl flex items-center gap-2 md:gap-3 shadow-[0_0_20px_rgba(203,202,202,0.25)] p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer text-neutral-950'
    >
      <img
        src={logo}
        alt={name}
        className='size-22.5 md:size-30 object-cover rounded-xl'
      />
      <div className='flex flex-col justify-center'>
        <h3 className='text-md md:text-lg font-extrabold text-neutral-950'>
          {name}
        </h3>
        <div className='md:text-md text-sm flex gap-1 items-center font-medium text-neutral-950'>
          <img src='/icons/star.svg' alt='star' className='size-6' />
          <span>{star}</span>
        </div>
        <div className='flex gap-1.5 items-center text-sm md:text-md'>
          <p>{place}</p>
          <span className='size-0.5 bg-neutral-950' />
          <p>{distance} km</p>
        </div>
      </div>
    </div>
  );
};

export default RestoCard;
