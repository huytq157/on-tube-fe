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
  }),
});

export const { useGetVideoQuery, useGetVideoByIdQuery } = VideoApiSlice;
