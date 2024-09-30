import { apiSlice } from "./baseApi";

export const CommentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ videoId, parentId }) => {
        let url = `comments/${videoId}`;
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
        url: "comments/create",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),

    updateComment: builder.mutation({
      query: ({ commentId, updatedData }) => ({
        url: `comments/${commentId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: "Comment", id: playlistId },
      ],
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, commentId) => [
        { type: "Comment", id: commentId },
      ],
    }),

    replyComment: builder.mutation({
      query: (newReply) => ({
        url: "comments/reply",
        method: "POST",
        body: newReply,
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
