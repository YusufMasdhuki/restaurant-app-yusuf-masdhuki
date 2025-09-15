// src/store/slices/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  totalItems: number;
}

const initialState: CartState = {
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
