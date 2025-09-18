import { useMyReviewsInfinite } from '@/hooks/reviews/useMyReviewsInfinite';
import type { GetMyReviewsSuccessResponse } from '@/types/get-my-review';
import type { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const MyReviewPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMyReviewsInfinite({ limit: 10 });

  const { ref, inView } = useInView();

  // Auto load next page ketika inView true
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  // pastikan data dianggap InfiniteData
  const infiniteData = data as
    | InfiniteData<GetMyReviewsSuccessResponse>
    | undefined;

  const allReviews =
    infiniteData?.pages.flatMap(
      (page: GetMyReviewsSuccessResponse) => page.data.reviews
    ) ?? [];

  return (
    <div className='max-w-300 mx-auto p-4 pt-32 pb-25'>
      <h1 className='text-2xl font-bold mb-4'>My Reviews</h1>

      {allReviews.length === 0 && <p>You haven't written any reviews yet.</p>}

      <div className='flex flex-col gap-4'>
        {allReviews.map((review) => (
          <div key={review.id} className='p-4 border rounded-lg shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='font-semibold'>{review.restaurant.name}</h2>
              <span className='text-sm text-gray-500'>
                {dayjs(review.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
            <p className='text-yellow-500 font-bold'>
              {'⭐'.repeat(review.star)}
            </p>
            <p className='mt-1'>{review.comment}</p>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className='mt-4 text-center'>
          <Button disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyReviewPage;
