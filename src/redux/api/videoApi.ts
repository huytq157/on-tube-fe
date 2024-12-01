import { apiSlice } from "./baseApi";

export const VideoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: ({ page = 1, limit = 12, category, isPublic }) => ({
        url: "video/list",
        params: { page, limit, category, isPublic },
        credentials: "include",
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
        credentials: "include",
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
        credentials: "include",
      }),
      invalidatesTags: ["Video"],
    }),

    updateVideo: builder.mutation({
      query: ({ videoId, updatedData }) => ({
        url: `video/${videoId}`,
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
        url: `video/${videoId}`,
        method: "DELETE",
        credentials: "include",
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
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),

    likeVideo: builder.mutation({
      query: (data) => ({
        url: "vote/like",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    dislikeVideo: builder.mutation({
      query: (data) => ({
        url: "vote/dislike",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    checkIsLiked: builder.query({
      query: (videoId) => ({
        url: `vote/check-like/${videoId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    checkIsDisLiked: builder.query({
      query: (videoId) => ({
        url: `vote/check-dislike/${videoId}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getlikeVideo: builder.query({
      query: () => ({
        url: "vote/video-like",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Video"],
    }),
    getChannelVideoCount: builder.query({
      query: (channelId) => ({
        url: `video/${channelId}/video-count`,
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
