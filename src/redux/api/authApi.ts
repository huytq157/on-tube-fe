import { apiSlice } from "./baseApi";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "auth/user",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } =
  authApiSlice;
