import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GeneratePayload, GenerateResult, GenerateResponse } from "../types/generateSlice";

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
      transformResponse: (response: { success: boolean; data: GenerateResult }) =>
        response.data,
    }),

    saveDiagram: builder.mutation<{ id: string }, GenerateResponse>({
      query: (payload) => ({
        url: "/diagrams",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: { success: boolean; data: { id: string } }) =>
        response.data,
    }),
  }),
});

export const { useGenerateArchitectureMutation, useSaveDiagramMutation } = generateApi;