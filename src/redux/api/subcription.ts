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
    listVideoSubcription: builder.query({
      query: ({}) => ({
        url: "subcription/video-sub",
        params: {},
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Subcription"],
    }),
    listSubcriber: builder.query({
      query: ({}) => ({
        url: "subcription/subcriber",
        params: {},
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Subcription"],
    }),
  }),
});

export const {
  useSubCriptionMutation,
  useListVideoSubcriptionQuery,
  useListSubcriberQuery,
} = SubcriptionApiSlice;
