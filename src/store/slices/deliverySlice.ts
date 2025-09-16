// store/deliverySlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DeliveryState {
  address: string;
  phone: string;
}

const initialState: DeliveryState = {
  address: '',
  phone: '',
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveryInfo: (state, action: PayloadAction<DeliveryState>) => {
      state.address = action.payload.address;
      state.phone = action.payload.phone;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
  },
});

export const { setDeliveryInfo, setAddress, setPhone } = deliverySlice.actions;
export default deliverySlice.reducer;
