import { DeleteReviewDialog } from '@/components/container/DeleteReviewDialog';
import { ReviewDialog } from '@/components/container/ReviewDialog';
import { UserSidebar } from '@/components/container/user-sidebar';
import { Button } from '@/components/ui/button';
import { useMyReviewsInfinite } from '@/hooks/reviews/useMyReviewsInfinite';
import type { GetMyReviewsSuccessResponse } from '@/types/get-my-review';
import type { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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

  const [editingReview, setEditingReview] = useState<{
    id: number;
    star: number;
    comment: string;
  } | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<null | number>(null);

  // Auto load next page saat scroll ke bawah
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const infiniteData = data as
    | InfiniteData<GetMyReviewsSuccessResponse>
    | undefined;
  const allReviews =
    infiniteData?.pages.flatMap((page) => page.data.reviews) ?? [];

  return (
    <div className='max-w-300 mx-auto p-4 pt-32 pb-25'>
      <div className='flex justify-between gap-8'>
        {/* Sidebar */}
        <div>
          <UserSidebar />
        </div>

        {/* Content */}
        <div className='w-full'>
          <h1 className='text-neutral-950 font-extrabold mb-6 text-display-md'>
            My Reviews
          </h1>
          {allReviews.length === 0 && (
            <p>You haven't written any reviews yet.</p>
          )}
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

                {/* Edit & Delete */}
                <div className='mt-2 flex gap-2'>
                  <Button
                    size='sm'
                    onClick={() =>
                      setEditingReview({
                        id: review.id,
                        star: review.star,
                        comment: review.comment,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => setConfirmDelete(review.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite scroll loader */}
      {hasNextPage && (
        <div ref={ref} className='mt-4 text-center'>
          <Button disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </Button>
        </div>
      )}

      {/* ReviewDialog untuk edit */}
      {editingReview && (
        <ReviewDialog
          open={!!editingReview}
          onClose={() => setEditingReview(null)}
          restaurantId={0} // tidak dibutuhkan untuk edit
          transactionId='0' // tidak dibutuhkan untuk edit
          reviewId={editingReview.id}
          defaultStar={editingReview.star}
          defaultComment={editingReview.comment}
        />
      )}

      <DeleteReviewDialog
        open={!!confirmDelete}
        reviewId={confirmDelete}
        onClose={() => setConfirmDelete(null)}
      />
    </div>
  );
};

export default MyReviewPage;
