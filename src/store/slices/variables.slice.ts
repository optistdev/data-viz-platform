import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface VariablesState {
  selectedVariables: string[];
}

const initialState: VariablesState = {
  selectedVariables: [],
};

export const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setSelectedVariables: (state, action: PayloadAction<string[]>) => {
      state.selectedVariables = action.payload;
    },

    clearSelectedVariables: (state) => {
      state.selectedVariables = [];
    },
  },
});

export const { setSelectedVariables, clearSelectedVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
