// components/container/DeleteReviewDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteReview } from '@/hooks/reviews/useDeleteReview';
import { AnimatePresence, motion } from 'motion/react';

interface DeleteReviewDialogProps {
  open: boolean;
  reviewId: number | null;
  onClose: () => void;
}

export const DeleteReviewDialog: React.FC<DeleteReviewDialogProps> = ({
  open,
  reviewId,
  onClose,
}) => {
  const deleteReview = useDeleteReview();

  const handleConfirm = () => {
    if (!reviewId) return;
    deleteReview.mutate(reviewId, {
      onSuccess: () => {
        onClose();
      },
    });
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
                <DialogTitle className='text-xl md:text-display-xs font-bold pb-4 md:pb-6'>
                  Delete Review
                </DialogTitle>
              </DialogHeader>
              <p className='text-sm md:text-md text-neutral-950 pb-4 md:pb-6'>
                Are you sure you want to delete this review?
              </p>
              <DialogFooter className='flex justify-end'>
                <Button
                  size='normal'
                  onClick={onClose}
                  className='bg-neutral-300 md:max-w-30 w-full'
                >
                  Cancel
                </Button>
                <Button
                  size='normal'
                  onClick={handleConfirm}
                  disabled={deleteReview.isPending}
                  className='bg-red-500 hover:bg-red-600 w-full md:max-w-30 text-white'
                >
                  {deleteReview.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
