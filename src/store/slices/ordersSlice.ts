// store/ordersSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OrderStatus } from '@/constants/order-statuses';

interface OrdersState {
  status: OrderStatus;
  search: Record<OrderStatus, string>;
}

const initialState: OrdersState = {
  status: 'preparing',
  search: {
    preparing: '',
    on_the_way: '',
    delivered: '',
    done: '',
    cancelled: '',
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<OrderStatus>) {
      state.status = action.payload;
    },
    setSearch(
      state,
      action: PayloadAction<{ status: OrderStatus; query: string }>
    ) {
      state.search[action.payload.status] = action.payload.query;
    },
  },
});

export const { setStatus, setSearch } = ordersSlice.actions;
export default ordersSlice.reducer;
