import { apiSlice } from "./baseApi";

export const VideoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: () => ({
        url: "video/list",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Video"],
    }),
    getVideoById: builder.query({
      query: (id) => ({
        url: `video/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),
    descView: builder.mutation({
      query: ({ videoId, watchTime }) => ({
        url: `video/watch/${videoId}`,
        method: "POST",
        body: { watchTime },
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Video", id: videoId },
      ],
    }),
    getVideoRecommend: builder.query({
      query: (id) => ({
        url: `video/list/recommend/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),
    searchVideo: builder.query({
      query: (searchTerm) => ({
        url: "video/search",
        params: { q: searchTerm },
      }),
      providesTags: ["Video"],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideoByIdQuery,
  useDescViewMutation,
  useGetVideoRecommendQuery,
  useSearchVideoQuery,
} = VideoApiSlice;
