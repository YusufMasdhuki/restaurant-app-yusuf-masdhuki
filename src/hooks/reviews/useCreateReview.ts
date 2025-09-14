import { createReview } from '@/services/reviews/service';
import type {
  CreateReviewErrorResponse,
  CreateReviewRequest,
  CreateReviewResponse,
} from '@/types/review.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateReviewResponse, // success response
    AxiosError<CreateReviewErrorResponse>, // error response
    CreateReviewRequest // payload
  >({
    mutationFn: createReview,
    onSuccess: (_, variables) => {
      // invalidate queries supaya data review & resto segar
      queryClient.invalidateQueries({
        queryKey: ['resto-detail', variables.restaurantId],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-orders'],
      });
    },
  });
};
