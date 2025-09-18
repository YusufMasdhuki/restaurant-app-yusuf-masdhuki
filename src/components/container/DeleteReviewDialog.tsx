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
      <DialogContent className='rounded-2xl p-6'>
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this review?</p>
        <DialogFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirm}
            disabled={deleteReview.isPending}
          >
            {deleteReview.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
