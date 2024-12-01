import { apiSlice } from "./baseApi";

export const SubcriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subCription: builder.mutation({
      query: (data) => ({
        url: "subcription/sub",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Subcription"],
    }),
    unSubCription: builder.mutation({
      query: (data) => ({
        url: "subcription/un-sub",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Subcription"],
    }),
    listVideoSubcription: builder.query({
      query: ({}) => ({
        url: "subcription/video-sub",
        params: {},
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Subcription"],
    }),
    listSubcriber: builder.query({
      query: ({}) => ({
        url: "subcription/subcriber",
        params: {},
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Subcription"],
    }),
    checkSubCription: builder.query({
      query: (channelId) => ({
        url: `subcription/check-sub/${channelId}`,
        credentials: "include",
      }),
      providesTags: ["Subcription"],
    }),
    getChannelSubscribersCount: builder.query({
      query: (channelId) => ({
        url: `subcription/channel/${channelId}/subcount`,
        credentials: "include",
      }),
      providesTags: ["Subcription"],
    }),
  }),
});

export const {
  useSubCriptionMutation,
  useListVideoSubcriptionQuery,
  useListSubcriberQuery,
  useUnSubCriptionMutation,
  useCheckSubCriptionQuery,
  useGetChannelSubscribersCountQuery,
} = SubcriptionApiSlice;
