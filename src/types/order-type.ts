// Pricing breakdown
export interface OrderPricing {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
}

// Item di dalam pesanan
export interface OrderItem {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

// Grup restoran
export interface OrderRestaurant {
  restaurantId: number;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
}

// Order detail
export interface Order {
  id: number;
  transactionId: string;
  status: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
  paymentMethod: string;
  pricing: OrderPricing;
  restaurants: OrderRestaurant[];
  createdAt: string;
  updatedAt: string;
}

// Pagination info
export interface OrderPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Filter info
export interface OrderFilter {
  status?: string;
}

// Response success
export interface MyOrderSuccessResponse {
  success: true;
  data: {
    orders: Order[];
    pagination: OrderPagination;
    filter: OrderFilter;
  };
}

// Response error
export interface MyOrderErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
