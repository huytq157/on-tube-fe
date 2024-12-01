import { apiSlice } from "./baseApi";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/api/auth/user",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
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
