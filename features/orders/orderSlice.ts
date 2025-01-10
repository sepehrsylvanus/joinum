import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  ordersToLink: number[];
}

const initialState: CounterState = {
  ordersToLink: [],
};

export const counterSlice = createSlice({
  name: "ordersToLink",
  initialState,
  reducers: {
    addOrderToLink: (state, action: PayloadAction<number>) => {
      state.ordersToLink.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrderToLink } = counterSlice.actions;

export default counterSlice.reducer;
