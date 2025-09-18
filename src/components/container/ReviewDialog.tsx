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
import Star from '../icons/star';

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
      <DialogContent className='rounded-2xl p-6'>
        <DialogHeader>
          <DialogTitle className='text-display-xs font-extrabold '>
            Give Review
          </DialogTitle>
        </DialogHeader>

        {/* Star rating */}
        <div className='flex flex-col items-center justify-center '>
          <h2 className='text-md font-extrabold'>Give Rating</h2>
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
          className='min-h-[235px] '
        />

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={createReview.isPending || star === 0}
            className='bg-primary-100 text-white'
          >
            {createReview.isPending ? 'Sending...' : 'Send'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
