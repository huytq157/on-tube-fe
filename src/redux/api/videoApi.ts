import { apiSlice } from "./baseApi";

export const VideoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: ({ page = 1, limit = 12, category, isPublic, videoType }) => ({
        url: "/api/video/list",
        params: { page, limit, category, isPublic, videoType },
        credentials: "include",
      }),
      keepUnusedDataFor: 60,
      providesTags: ["Video"],
    }),

    getVideoById: builder.query({
      query: (id) => ({
        url: `/api/video/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),

    descView: builder.mutation({
      query: ({ videoId, watchTime }) => ({
        url: `/api/video/watch/${videoId}`,
        method: "POST",
        body: { watchTime },
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Video", id: videoId },
      ],
    }),

    descViewAuth: builder.mutation({
      query: ({ videoId, watchTime }) => ({
        url: `/api/video/watch/auth/${videoId}`,
        method: "POST",
        body: { watchTime },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Video", id: videoId },
      ],
    }),

    getVideoRecommend: builder.query({
      query: (id) => ({
        url: `/api/video/list/recommend/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),

    searchVideo: builder.query({
      query: (searchTerm) => ({
        url: "/api/video/search",
        params: { q: searchTerm },
      }),
      providesTags: ["Video"],
    }),

    addVideo: builder.mutation({
      query: (newVideo) => ({
        url: "/api/video/add",
        method: "POST",
        body: newVideo,
        credentials: "include",
      }),
      invalidatesTags: ["Video"],
    }),

    updateVideo: builder.mutation({
      query: ({ videoId, updatedData }) => ({
        url: `/api/video/${videoId}`,
        method: "PATCH",
        body: updatedData,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Video", id: videoId },
      ],
    }),

    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: `/api/video/${videoId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, videoId) => [
        { type: "Video", id: videoId },
      ],
    }),

    getVideoTrending: builder.query({
      query: () => ({
        url: "/api/video/trending",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Video"],
    }),

    getVideoHistory: builder.query({
      query: ({ userId }) => ({
        url: `/api/video/user/${userId}/history`,
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),

    likeVideo: builder.mutation({
      query: (data) => ({
        url: "/api/vote/like",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    dislikeVideo: builder.mutation({
      query: (data) => ({
        url: "/api/vote/dislike",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    checkIsLiked: builder.query({
      query: (videoId) => ({
        url: `/api/vote/check-like/${videoId}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    checkIsDisLiked: builder.query({
      query: (videoId) => ({
        url: `/api/vote/check-dislike/${videoId}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getlikeVideo: builder.query({
      query: () => ({
        url: "/api/vote/video-like",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Video"],
    }),

    getChannelVideoCount: builder.query({
      query: (channelId) => ({
        url: `/api/video/${channelId}/video-count`,
      }),
      providesTags: ["Video"],
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
  useLikeVideoMutation,
  useDislikeVideoMutation,
  useCheckIsLikedQuery,
  useCheckIsDisLikedQuery,
  useGetlikeVideoQuery,
  useGetChannelVideoCountQuery,
} = VideoApiSlice;
