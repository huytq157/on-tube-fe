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

    updateSeenNotification: builder.mutation({
      query: ({ notificationId, user_id }) => ({
        url: "notification/update-seen",
        method: "PUT",
        body: { notificationId, user_id },
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
