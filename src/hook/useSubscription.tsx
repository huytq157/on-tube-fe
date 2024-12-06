"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  useCheckSubCriptionQuery,
  useGetChannelSubscribersCountQuery,
  useSubCriptionMutation,
  useUnSubCriptionMutation,
} from "@/redux/api/subcription";
import {
  setSubscribersCount,
  setSubscriptionStatus,
} from "@/redux/features/subcriptionSlice";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useCreateNotificationMutation } from "@/redux/api/notificationApi";

export const useSubscription = (channelId: string | any, user: any) => {
  const dispatch = useDispatch();
  const [subscribe] = useSubCriptionMutation();
  const [unsubscribe] = useUnSubCriptionMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createNotification] = useCreateNotificationMutation();

  const { data: subscriptionStatus } = useCheckSubCriptionQuery(channelId, {
    skip: !user || !channelId,
  });

  const { data: subscribersCount } = useGetChannelSubscribersCountQuery(
    channelId,
    { skip: !channelId }
  );

  useEffect(() => {
    if (subscriptionStatus) {
      dispatch(
        setSubscriptionStatus({
          channelId,
          subscribed: subscriptionStatus.subscribed,
        })
      );
    }
    if (subscribersCount) {
      dispatch(
        setSubscribersCount({ channelId, count: subscribersCount.count })
      );
    }
  }, [subscriptionStatus, subscribersCount, dispatch, channelId]);

  const handleSubscriptionToggle = async () => {
    if (!user) {
      message.warning("Bạn phải đăng nhập để đăng ký!");
      return;
    }
    if (!channelId) return;

    try {
      setIsProcessing(true);

      if (subscriptionStatus?.subscribed) {
        await unsubscribe({ channelId }).unwrap();
        dispatch(setSubscriptionStatus({ channelId, subscribed: false }));
        message.success("Đã hủy đăng ký kênh!");
      } else {
        await subscribe({ channelId }).unwrap();
        dispatch(setSubscriptionStatus({ channelId, subscribed: true }));

        await createNotification({
          comment: null,
          video: null,
          message: "đã đăng ký kênh của bạn",
          url: `/channel/${user?.user?._id}/video`,
          user: [channelId],
        }).unwrap();

        message.success("Đã đăng ký kênh!");
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsProcessing(false);
    }
  };

  const currentSubscriptionStatus = useSelector(
    (state: any) => state.subscription.subscriptionStatus[channelId]
  );
  const currentSubscribersCount = useSelector(
    (state: any) => state.subscription.subscribersCount[channelId]
  );

  return {
    currentSubscriptionStatus,
    currentSubscribersCount,
    handleSubscriptionToggle,
    isProcessing,
  };
};
