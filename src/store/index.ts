// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import deliveryReducer from './slices/deliverySlice';
import ordersReducer from './slices/ordersSlice';
import restaurantFilterReducer from './slices/restaurantFilterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    delivery: deliveryReducer,
    orders: ordersReducer,
    restaurantFilter: restaurantFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
