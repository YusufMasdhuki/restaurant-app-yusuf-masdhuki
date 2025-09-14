import { updateReview } from '@/services/reviews/service';
import type {
  UpdateReviewErrorResponse,
  UpdateReviewRequest,
  UpdateReviewSuccessResponse,
} from '@/types/update-review';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateReview = () => {
  return useMutation<
    UpdateReviewSuccessResponse, // ✅ success response
    AxiosError<UpdateReviewErrorResponse>, // ✅ error type
    { id: number; payload: UpdateReviewRequest } // ✅ variables (argumen saat mutate)
  >({
    mutationFn: ({ id, payload }) => updateReview(id, payload),
  });
};
