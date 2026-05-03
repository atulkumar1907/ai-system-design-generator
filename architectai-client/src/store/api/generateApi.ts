import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GeneratePayload, GenerateResult } from "../types/generateSlice";

export const generateApi = createApi({
  reducerPath: "generateApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    generateArchitecture: builder.mutation<GenerateResult, GeneratePayload>({
      query: (payload) => ({
        url: "/generate",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGenerateArchitectureMutation } = generateApi;