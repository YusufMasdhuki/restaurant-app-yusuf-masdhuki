import { useRestoDetail } from './useRestoDetail';

export const useRestoMenus = (restaurantId: number) => {
  const { data } = useRestoDetail(restaurantId, { limitMenu: 100 }); // ambil semua menu
  return data?.data.menus ?? [];
};
