import { apiSlice } from "./baseApi";

export const UploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/api/upload/image",
        method: "POST",
        body: formData,
        headers: {
          accept: "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.data.map((file: any) => file.url);
      },
    }),

    uploadVideo: builder.mutation({
      query: (formData) => ({
        url: "/api/upload/video",
        method: "POST",
        body: formData,
        headers: {
          accept: "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.data.map((file: any) => file.url);
      },
    }),
  }),
});

export const { useUploadImageMutation, useUploadVideoMutation } =
  UploadApiSlice;
