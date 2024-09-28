import { apiSlice } from "./baseApi";

export const PlaylistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylist: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "playlist/list",
        params: { page, limit },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Playlist"],
    }),

    getPlaylistById: builder.query({
      query: (id) => ({
        url: `playlist/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Playlist", id }],
    }),

    addPlaylist: builder.mutation({
      query: (newplaylist) => ({
        url: "playlist",
        method: "POST",
        body: newplaylist,
      }),
      invalidatesTags: ["Playlist"],
    }),

    updatePlaylist: builder.mutation({
      query: ({ playlistId, updatedData }) => ({
        url: `playlist/${playlistId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: "Playlist", id: playlistId },
      ],
    }),

    deletePlaylist: builder.mutation({
      query: (playlistId) => ({
        url: `playlist/${playlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, playlistId) => [
        { type: "Playlist", id: playlistId },
      ],
    }),
  }),
});

export const {
  useGetPlaylistQuery,
  useGetPlaylistByIdQuery,
  useAddPlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = PlaylistApiSlice;
