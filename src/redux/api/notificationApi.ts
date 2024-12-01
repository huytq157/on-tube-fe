import { apiSlice } from "./baseApi";

export const NotificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: "/api/notification/create",
        method: "POST",
        body: notificationData,
        credentials: "include",
      }),
    }),

    getNotification: builder.query({
      query: () => ({
        url: "/api/notification/gets",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Notification"],
    }),

    updateSeenNotification: builder.mutation({
      query: ({ notificationId, user_id }) => ({
        url: "/api/notification/update-seen",
        method: "PUT",
        body: { notificationId, user_id },
        credentials: "include",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationQuery,
  useUpdateSeenNotificationMutation,
} = NotificationApiSlice;
