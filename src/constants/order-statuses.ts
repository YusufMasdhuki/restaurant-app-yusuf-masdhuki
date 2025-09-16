// constants/order-statuses.ts
export const ORDER_STATUSES = [
  { value: 'preparing', label: 'Preparing' },
  { value: 'on_the_way', label: 'On The Way' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number]['value'];
