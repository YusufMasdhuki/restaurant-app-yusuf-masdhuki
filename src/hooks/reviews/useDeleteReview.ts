import { deleteReview } from '@/services/reviews/service';
import type {
  DeleteReviewErrorResponse,
  DeleteReviewSuccessResponse,
} from '@/types/delete-review';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteReview = () => {
  return useMutation<
    DeleteReviewSuccessResponse, // ✅ success response
    AxiosError<DeleteReviewErrorResponse>, // ✅ error type
    number // ✅ variables (id review yang mau dihapus)
  >({
    mutationFn: (id: number) => deleteReview(id),
  });
};
