// Request body
export interface CheckoutRequest {
  paymentMethod: string;
  deliveryAddress: string;
  notes?: string;
}

// Pricing breakdown
export interface CheckoutPricing {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
}

// Item in restaurant
export interface CheckoutItem {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

// Restaurant group
export interface CheckoutRestaurant {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CheckoutItem[];
  subtotal: number;
}

// Transaction data
export interface CheckoutTransaction {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: string; // e.g. "preparing"
  pricing: CheckoutPricing;
  restaurants: CheckoutRestaurant[];
  createdAt: string;
}

// Success response
export interface CheckoutSuccessResponse {
  success: true;
  message: string; // "Order placed successfully"
  data: {
    transaction: CheckoutTransaction;
  };
}

// Error response (400, 401, 500)
export interface CheckoutErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
