import { apiSlice } from "./baseApi";

export const SubcriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subCription: builder.mutation({
      query: (data) => ({
        url: "/api/subcription/sub",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Subcription"],
    }),
    unSubCription: builder.mutation({
      query: (data) => ({
        url: "/api/subcription/un-sub",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Subcription"],
    }),
    listVideoSubcription: builder.query({
      query: ({}) => ({
        url: "/api/subcription/video-sub",
        params: {},
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Subcription"],
    }),
    listSubcriber: builder.query({
      query: ({}) => ({
        url: "/api/subcription/subcriber",
        params: {},
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Subcription"],
    }),
    checkSubCription: builder.query({
      query: (channelId) => ({
        url: `/api/subcription/check-sub/${channelId}`,
        credentials: "include",
      }),
      providesTags: ["Subcription"],
    }),
    getChannelSubscribersCount: builder.query({
      query: (channelId) => ({
        url: `/api/subcription/channel/${channelId}/subcount`,
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
