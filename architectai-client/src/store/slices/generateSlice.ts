import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";
import type { GenerateResult, GenerateState } from "../types/generateSlice";

const initialState: GenerateState = {
  isLoading: false,
  error: null,
  result: null,
};

const generateSlice = createSlice({
  name: "generate",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setResult(state, action: PayloadAction<GenerateResult>) {
      state.result = action.payload;
    },
    resetGenerate(state) {
      state.isLoading = false;
      state.error = null;
      state.result = null;
    },
  },
});

export const { setLoading, setError, setResult, resetGenerate } =
  generateSlice.actions;

export default generateSlice.reducer;