import { apiSlice } from "./baseApi";

export const CategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "categories/list",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),
    getPlaylist: builder.query({
      query: () => ({
        url: "playlist/list",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Playlist"],
    }),
  }),
});

export const { useGetCategoryQuery, useGetPlaylistQuery } = CategoryApiSlice;
