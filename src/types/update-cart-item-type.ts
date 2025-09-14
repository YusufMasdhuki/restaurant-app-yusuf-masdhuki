// Request body
export interface UpdateCartItemRequest {
  quantity: number;
}

// Restaurant info in cart item
export interface CartRestaurant {
  id: number;
  name: string;
  logo: string;
}

// Menu info in cart item
export interface CartMenu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

// Cart item structure
export interface CartItem {
  id: number;
  restaurant: CartRestaurant;
  menu: CartMenu;
  quantity: number;
  itemTotal: number;
}

// Success response
export interface UpdateCartItemSuccessResponse {
  success: true;
  data: {
    cartItem: CartItem;
  };
}

// Error response (400, 401, 404, 500)
export interface UpdateCartItemErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
