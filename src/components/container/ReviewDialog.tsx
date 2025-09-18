import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useCreateReview } from '@/hooks/reviews/useCreateReview';
import { useUpdateReview } from '@/hooks/reviews/useUpdateReview';
import { useQueryClient } from '@tanstack/react-query';
import Star from '../icons/star';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  restaurantId: number;
  transactionId: string;
  reviewId?: number; // optional, edit mode
  defaultStar?: number;
  defaultComment?: string;
}

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  restaurantId,
  transactionId,
  reviewId,
  defaultStar = 0,
  defaultComment = '',
}) => {
  const [star, setStar] = useState(defaultStar);
  const [comment, setComment] = useState(defaultComment);

  const queryClient = useQueryClient();
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();

  // Reset when modal opens/closes
  useEffect(() => {
    if (open) {
      setStar(defaultStar);
      setComment(defaultComment);
    }
  }, [open, defaultStar, defaultComment]);

  const handleSubmit = () => {
    if (reviewId) {
      // Edit review
      updateReview.mutate(
        { id: reviewId, payload: { star, comment } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['my-reviews-infinite'],
            });
            // ⚡ refresh review list
            onClose();
          },
        }
      );
    } else {
      // Create review
      createReview.mutate(
        { transactionId, restaurantId, star, comment },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['my-reviews-infinite'],
            });
            // ⚡ refresh review list
            onClose();
            setStar(0);
            setComment('');
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='rounded-2xl p-6'>
        <DialogHeader>
          <DialogTitle className='text-display-xs font-extrabold'>
            {reviewId ? 'Edit Review' : 'Give Review'}
          </DialogTitle>
        </DialogHeader>

        {/* Star rating */}
        <div className='flex flex-col items-center justify-center mb-4'>
          <h2 className='text-md font-extrabold'>Rating</h2>
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type='button'
                onClick={() => setStar(val)}
                className={val <= star ? 'text-yellow-500' : 'text-gray-300'}
              >
                <Star />
              </button>
            ))}
          </div>
        </div>

        {/* Comment input */}
        <Textarea
          placeholder='Please share your thoughts about our service!'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='min-h-[235px] mb-4'
        />

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              star === 0 || createReview.isPending || updateReview.isPending
            } // ✅ correct
            className='bg-primary-100 text-white'
          >
            {reviewId
              ? updateReview.isPending
                ? 'Saving...'
                : 'Save'
              : createReview.isPending
              ? 'Sending...'
              : 'Send'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
