// Menu detail in cart item
export interface CartMenu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

// Item inside a restaurant cart
export interface CartItem {
  id: number;
  menu: CartMenu;
  quantity: number;
  itemTotal: number;
}

// Restaurant group in cart
export interface CartRestaurant {
  id: number;
  name: string;
  logo: string;
}

// Cart object per restaurant
export interface CartGroup {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
}

// Summary of the whole cart
export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

// Success response
export interface CartSuccessResponse {
  success: true;
  message: string;
  data: {
    cart: CartGroup[];
    summary: CartSummary;
  };
}

// Error response (401, 500)
export interface CartErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

export interface CartGroup {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
}

export interface CartResponse {
  success: true;
  data: {
    cart: CartGroup[];
  };
}
