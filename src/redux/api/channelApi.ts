import { apiSlice } from "./baseApi";

export const ChannelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannelInfo: builder.query({
      query: (id) => ({
        url: `channel/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Channel", id }],
    }),
    getChannelVideo: builder.query({
      query: (id) => ({
        url: `channel/video/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Channel", id }],
    }),
    searchChannel: builder.query({
      query: (searchTerm) => ({
        url: "channel/search",
        params: { q: searchTerm },
      }),
      providesTags: ["Channel"],
    }),
  }),
});

export const {
  useGetChannelInfoQuery,
  useSearchChannelQuery,
  useGetChannelVideoQuery,
} = ChannelApiSlice;
