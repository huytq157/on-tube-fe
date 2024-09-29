import { apiSlice } from "./baseApi";

export const VideoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: ({ page = 1, limit = 6, category, isPublic }) => ({
        url: "video/list",
        params: { page, limit, category, isPublic },
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

    descViewAuth: builder.mutation({
      query: ({ videoId, watchTime }) => ({
        url: `video/watch/auth/${videoId}`,
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

    getVideoHistory: builder.query({
      query: ({ userId }) => ({
        url: `video/user/${userId}/history`,
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideoByIdQuery,
  useDescViewMutation,
  useDescViewAuthMutation,
  useGetVideoRecommendQuery,
  useSearchVideoQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoTrendingQuery,
  useGetVideoHistoryQuery,
} = VideoApiSlice;
