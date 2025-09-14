import { getRestoDetail } from '@/services/restaurants/service';
import type {
  GetRestoDetailErrorResponse,
  GetRestoDetailQuery,
  GetRestoDetailSuccessResponse,
} from '@/types/resto-detail-type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRestoDetail = (id: number, params?: GetRestoDetailQuery) => {
  return useQuery<
    GetRestoDetailSuccessResponse, // success type
    AxiosError<GetRestoDetailErrorResponse> // error type
  >({
    queryKey: ['resto-detail', id, params],
    queryFn: () => getRestoDetail(id, params),
    enabled: !!id, // hanya jalan kalau ada id
  });
};
