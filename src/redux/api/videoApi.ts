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
  }),
});

export const { useGetVideoQuery } = VideoApiSlice;
