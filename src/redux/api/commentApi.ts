import { apiSlice } from "./baseApi";

export const CommentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ videoId, parentId }) => {
        let url = `/api/comments/${videoId}`;
        if (parentId) {
          url += `?parent_id=${parentId}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      keepUnusedDataFor: 5,
      providesTags: (result, error, { videoId }) => [
        { type: "Comment", id: videoId },
      ],
    }),

    addComment: builder.mutation({
      query: (newComment) => ({
        url: "/api/comments/create",
        method: "POST",
        body: newComment,
        credentials: "include",
      }),
      invalidatesTags: ["Comment"],
    }),

    updateComment: builder.mutation({
      query: ({ commentId, comment }) => ({
        url: `/api/comments/${commentId}`,
        method: "PUT",
        body: comment,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: "Comment", id: playlistId },
      ],
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/api/comments/${commentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Comment"],
    }),

    replyComment: builder.mutation({
      query: (newReply) => ({
        url: "/api/comments/reply",
        method: "POST",
        body: newReply,
        credentials: "include",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useReplyCommentMutation,
} = CommentApiSlice;
