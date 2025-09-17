// src/store/slices/restaurantFilterSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Filters {
  location: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
}

const initialState: Filters = {
  location: 'jakarta',
  range: undefined,
  priceMin: undefined,
  priceMax: undefined,
  rating: undefined,
};

const restaurantFilterSlice = createSlice({
  name: 'restaurantFilter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = restaurantFilterSlice.actions;
export default restaurantFilterSlice.reducer;
