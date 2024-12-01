import { apiSlice } from "./baseApi";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "auth/user",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApiSlice;
