import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  GenerateState,
  GenerateResponse,
  GeneratePayload,
} from "../types/generateSlice";

const initialState: GenerateState = {
  isLoading: false,
  error: null,
  result: null,
  sessionId: null,
  prompt: null,
  generatedAt: null,
  lastRequest: null,
  activeArchitectureType: null,
  architectures: []
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

    setResult(state, action: PayloadAction<GenerateResponse>) {
      state.result = action.payload;
      state.sessionId = action.payload.sessionId;
      state.prompt = action.payload.prompt;
      state.generatedAt = action.payload.generatedAt;
      state.lastRequest = action.payload.request;
      // default active tab to first architecture type returned
      state.activeArchitectureType = action.payload.architectures[0]?.type ?? null;
    },

    setActiveArchitectureType(state, action: PayloadAction<string>) {
      state.activeArchitectureType = action.payload;
    },

    setLastRequest(state, action: PayloadAction<GeneratePayload>) {
      state.lastRequest = action.payload;
    },

    resetGenerate(state) {
      state.isLoading = false;
      state.error = null;
      state.result = null;
      state.sessionId = null;
      state.prompt = null;
      state.generatedAt = null;
      state.lastRequest = null;
      state.activeArchitectureType = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setResult,
  setActiveArchitectureType,
  setLastRequest,
  resetGenerate,
} = generateSlice.actions;

export default generateSlice.reducer;