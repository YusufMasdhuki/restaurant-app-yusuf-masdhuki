// constants/restaurant-filters.ts
interface RestaurantFilter {
  label: string;
  icon: string;
  path?: string; // 👉 optional, kalau ada berarti klik akan navigate
}

export const RESTAURANT_FILTERS: RestaurantFilter[] = [
  {
    label: 'All Restaurant',
    icon: '/icons/all-restaurant-icon.svg',
    path: '/all-restaurant',
  },
  {
    label: 'Nearby',
    icon: '/icons/nearby-icon.svg',
    path: '/all-restaurant?filter=nearby',
  },
  {
    label: 'Discount',
    icon: '/icons/discount-icon.svg',
    path: '/all-restaurant',
  },
  {
    label: 'Best Seller',
    icon: '/icons/best-seller-icon.svg',
    path: '#',
  },
  {
    label: 'Delivery',
    icon: '/icons/delivery-icon.svg',
    path: '/my-orders',
  },
  {
    label: 'Lunch',
    icon: '/icons/lunch-icon.svg',
    path: '/all-restaurant',
  },
];
