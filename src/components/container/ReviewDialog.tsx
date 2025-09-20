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
import { AnimatePresence, motion } from 'motion/react';

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
      <DialogContent className='sm:max-w-[450px] bg-transparent p-4'>
        <AnimatePresence mode='wait'>
          {open && (
            <motion.div
              key='update-profile-dialog'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='bg-white rounded-2xl p-4 md:p-6 shadow-xl'
            >
              <DialogHeader>
                <DialogTitle className='text-xl md:text-display-xs font-extrabold mb-4 md:mb-6'>
                  {reviewId ? 'Edit Review' : 'Give Review'}
                </DialogTitle>
              </DialogHeader>

              {/* Star rating */}
              <div className='flex flex-col items-center justify-center mb-4 md:mb-6'>
                <h2 className='text-md font-extrabold'>Give Rating</h2>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type='button'
                      onClick={() => setStar(val)}
                      className={
                        val <= star ? 'text-yellow-500' : 'text-gray-300'
                      }
                    >
                      <Star className='size-10 md:size-12' />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <Textarea
                placeholder='Please share your thoughts about our service!'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='min-h-[235px] mb-4 md:mb-6 text-sm md:text-md'
              />

              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    star === 0 ||
                    createReview.isPending ||
                    updateReview.isPending
                  } // ✅ correct
                  className='bg-primary-100 hover:bg-[#db6d65] text-white'
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
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
