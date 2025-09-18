import { deleteReview } from '@/services/reviews/service';
import type {
  DeleteReviewErrorResponse,
  DeleteReviewSuccessResponse,
} from '@/types/delete-review';
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import type { GetMyReviewsSuccessResponse } from '@/types/get-my-review';
import { AxiosError } from 'axios';

interface DeleteContext {
  previousData?: InfiniteData<GetMyReviewsSuccessResponse>;
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteReviewSuccessResponse, // success response
    AxiosError<DeleteReviewErrorResponse>, // error type
    number, // id review
    DeleteContext // <-- tipe context
  >({
    mutationFn: (id: number) => deleteReview(id),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'my-reviews-infinite',
      });

      const previousData = queryClient.getQueryData<
        InfiniteData<GetMyReviewsSuccessResponse>
      >(['my-reviews-infinite']);

      queryClient.setQueryData<InfiniteData<GetMyReviewsSuccessResponse>>(
        ['my-reviews-infinite'],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                reviews: page.data.reviews.filter((r) => r.id !== id),
              },
            })),
          };
        }
      );

      return { previousData }; // <-- ini sekarang dikenali oleh TS
    },

    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['my-reviews-infinite'], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'my-reviews-infinite',
      });
    },
  });
};
