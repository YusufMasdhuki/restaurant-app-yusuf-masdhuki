import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useCreateReview } from '@/hooks/reviews/useCreateReview';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  restaurantId: number;
  transactionId: string;
}

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  restaurantId,
  transactionId,
}) => {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');
  const createReview = useCreateReview();

  const handleSubmit = () => {
    createReview.mutate(
      {
        transactionId,
        restaurantId,
        star,
        comment,
      },
      {
        onSuccess: () => {
          onClose();
          setStar(0);
          setComment('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Give Review</DialogTitle>
        </DialogHeader>

        {/* Star rating */}
        <div className='flex gap-2 mb-4'>
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type='button'
              onClick={() => setStar(val)}
              className={val <= star ? 'text-yellow-500' : 'text-gray-300'}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment input */}
        <Textarea
          placeholder='Write your review...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createReview.isPending || star === 0}
          >
            {createReview.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
