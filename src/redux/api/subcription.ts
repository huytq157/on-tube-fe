import { apiSlice } from "./baseApi";

export const SubcriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subCription: builder.mutation({
      query: (data) => ({
        url: "subcription/sub",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subcription"],
    }),
  }),
});

export const { useSubCriptionMutation } = SubcriptionApiSlice;
