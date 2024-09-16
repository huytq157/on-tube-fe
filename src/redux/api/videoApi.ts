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
  }),
});

export const { useGetVideoQuery, useGetVideoByIdQuery, useDescViewMutation } =
  VideoApiSlice;
