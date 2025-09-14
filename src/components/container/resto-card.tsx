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

const RestoCard: React.FC<RestoCardProps> = ({
  logo,
  name,
  star,
  place,
  distance = '-',
}) => {
  return (
    <div className='rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(203,202,202,0.25)] p-4 border border-neutral-200'>
      <img
        src={logo}
        alt={name}
        className='w-30 h-30 object-cover rounded-xl'
      />
      <div className='flex flex-col justify-center'>
        <h3 className='text-lg font-extrabold text-neutral-950'>{name}</h3>
        <div className='text-md flex gap-2 items-center font-medium text-neutral-950'>
          <img src='/icons/star.svg' alt='star' />
          <span>{star}</span>
        </div>
        <div className='flex gap-1.5 items-center'>
          <p className='text-md text-neutral-950'>{place}</p>
          <span className='size-0.5 bg-neutral-950' />
          <p className='text-md text-neutral-950'>{distance} km</p>
        </div>
      </div>
    </div>
  );
};

export default RestoCard;
