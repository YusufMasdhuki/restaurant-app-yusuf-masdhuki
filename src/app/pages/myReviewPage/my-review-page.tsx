import { DeleteReviewDialog } from '@/components/container/DeleteReviewDialog';
import { ReviewDialog } from '@/components/container/ReviewDialog';
import { UserSidebar } from '@/components/container/user-sidebar';
import { Button } from '@/components/ui/button';
import { useMyReviewsInfinite } from '@/hooks/reviews/useMyReviewsInfinite';
import { useIsMobile } from '@/lib/useIsMobile';
import type { GetMyReviewsSuccessResponse } from '@/types/get-my-review';
import type { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const MyReviewPage = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Error: {error?.message}</p>
      </div>
    );

  const infiniteData = data as
    | InfiniteData<GetMyReviewsSuccessResponse>
    | undefined;
  const allReviews =
    infiniteData?.pages.flatMap((page) => page.data.reviews) ?? [];

  return (
    <div className='max-w-300 mx-auto p-4 pt-20 md:pt-32 pb-10 md:pb-25'>
      <div className='flex justify-between gap-8'>
        {/* Sidebar */}
        {!isMobile && (
          <div>
            <UserSidebar />
          </div>
        )}

        {/* Content */}
        <div className='w-full'>
          <h1 className='text-neutral-950 font-extrabold mb-6 text-display-md'>
            My Reviews
          </h1>
          {allReviews.length === 0 && (
            <div className='flex items-center justify-center h-[70vh]'>
              <p>You haven't written any reviews yet.</p>
            </div>
          )}
          <div className='flex flex-col gap-4'>
            {allReviews.map((review) => (
              <div
                key={review.id}
                className='p-4 md:p-5 border rounded-2xl shadow-[0_0_20px_rgba(203,202,202,0.25)] flex flex-col gap-3 md:gap-4'
              >
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <img
                      src='/icons/resto-icon.svg'
                      alt='resto-icon'
                      className='size-8'
                    />
                    <h2 className='font-bold text-sm md:text-lg'>
                      {review.restaurant.name}
                    </h2>
                  </div>
                  <p className='text-sm md:text-md text-neutral-950'>
                    {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
                  </p>
                </div>

                <div className='flex items-center gap-0 md:gap-0.5'>
                  {Array.from({ length: review.star }).map((_, i) => (
                    <img
                      key={i}
                      src='/icons/star.svg'
                      alt='star'
                      className='size-6'
                    />
                  ))}
                </div>
                <p className='mt-1'>{review.comment}</p>

                {/* Edit & Delete */}
                <div className='mt-2 flex gap-2'>
                  <Button
                    size='normal'
                    className='border border-primary-300 md:max-w-30 w-full'
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
                    size='normal'
                    className='bg-red-500 text-white hover:bg-red-600 w-full md:max-w-30'
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
