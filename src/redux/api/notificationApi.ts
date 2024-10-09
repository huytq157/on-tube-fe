import { apiSlice } from "./baseApi";

export const NotificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: "/notification/create",
        method: "POST",
        body: notificationData,
      }),
    }),

    getNotification: builder.query({
      query: () => ({
        url: "notification/gets",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Notification"],
    }),

    updateSeenNotification: builder.query({
      query: () => ({
        url: "notification/update-seen",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationQuery,
  useUpdateSeenNotificationQuery,
} = NotificationApiSlice;
