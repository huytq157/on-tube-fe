import { apiSlice } from "./baseApi";

export const VideoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: ({ page = 1, limit = 6, category }) => ({
        url: "video/list",
        params: { page, limit, category },
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

    addVideo: builder.mutation({
      query: (newVideo) => ({
        url: "video/add",
        method: "POST",
        body: newVideo,
      }),
      invalidatesTags: ["Video"],
    }),

    updateVideo: builder.mutation({
      query: ({ videoId, updatedData }) => ({
        url: `video/${videoId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Video", id: videoId },
      ],
    }),

    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: `video/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, videoId) => [
        { type: "Video", id: videoId },
      ],
    }),

    getVideoTrending: builder.query({
      query: () => ({
        url: "video/trending",
      }),
      keepUnusedDataFor: 5,
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
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoTrendingQuery,
} = VideoApiSlice;
