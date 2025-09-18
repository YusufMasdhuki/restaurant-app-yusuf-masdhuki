import { useMyReviewsInfinite } from '@/hooks/reviews/useMyReviewsInfinite';
import { useDeleteReview } from '@/hooks/reviews/useDeleteReview';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ReviewDialog } from '@/components/container/ReviewDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { InfiniteData } from '@tanstack/react-query';
import type { GetMyReviewsSuccessResponse } from '@/types/get-my-review';

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
  const deleteReview = useDeleteReview();
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

      {/* ShadCN confirm dialog untuk delete */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={() => setConfirmDelete(null)}
      >
        <DialogContent className='rounded-2xl p-6'>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this review?</p>
          <DialogFooter className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              disabled={deleteReview.isPending}
              onClick={() =>
                confirmDelete &&
                deleteReview.mutate(confirmDelete, {
                  onSuccess: () => setConfirmDelete(null),
                })
              }
            >
              {deleteReview.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyReviewPage;
