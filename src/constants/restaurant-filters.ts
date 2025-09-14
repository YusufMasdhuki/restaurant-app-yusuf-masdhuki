interface RestaurantFilter {
  label: string;
  icon: string;
}

export const RESTAURANT_FILTERS: RestaurantFilter[] = [
  { label: 'All Restaurant', icon: '/icons/all-restaurant-icon.svg' },
  { label: 'Nearby', icon: '/icons/nearby-icon.svg' },
  { label: 'Discount', icon: '/icons/discount-icon.svg' },
  { label: 'Best Seller', icon: '/icons/best-seller-icon.svg' },
  { label: 'Delivery', icon: '/icons/delivery-icon.svg' },
  { label: 'Lunch', icon: '/icons/lunch-icon.svg' },
];
