import { configureStore } from "@reduxjs/toolkit";
import generateReducer from "./slices/generateSlice";
import { generateApi } from "./api/generateApi";

export const store = configureStore({
  reducer: {
    generate: generateReducer,
    [generateApi.reducerPath]: generateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;