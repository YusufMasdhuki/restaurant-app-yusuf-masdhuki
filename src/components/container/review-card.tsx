// src/components/container/review-card.tsx
import dayjs from 'dayjs';

interface Review {
  id: number;
  user: {
    name: string;
  };
  star: number;
  comment: string;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className='p-4 rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)]'>
      <div className='flex items-center gap-3 mb-4'>
        <img
          src='/images/default-avatar.png'
          alt='avatar'
          className='size-14.5 md:size-16'
        />
        <div>
          <p className='font-extrabold text-md md:text-lg text-neutral-950'>
            {review.user.name}
          </p>
          <p className='text-sm md:text-md text-neutral-950'>
            {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-0 md:gap-0.5 mb-2'>
        {Array.from({ length: review.star }).map((_, i) => (
          <img key={i} src='/icons/star.svg' alt='star' className='size-6' />
        ))}
      </div>
      <p className='text-sm md:text-md text-neutral-950'>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
