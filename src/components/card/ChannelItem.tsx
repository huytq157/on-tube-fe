"use client";

import {
  useCheckSubCriptionQuery,
  useGetChannelSubscribersCountQuery,
  useSubCriptionMutation,
  useUnSubCriptionMutation,
} from "@/redux/api/subcription";
import { useGetChannelVideoCountQuery } from "@/redux/api/videoApi";
import {
  setSubscribersCount,
  setSubscriptionStatus,
} from "@/redux/features/subcriptionSlice";
import { message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChannelItem: React.FC<any> = ({ sub }) => {
  const dispatch = useDispatch();
  const channelId = sub?._id;
  const { data: subscriptionStatus } = useCheckSubCriptionQuery(sub?._id);
  const { data: videoCount } = useGetChannelVideoCountQuery(sub?._id);
  const { data: subscribersCount } = useGetChannelSubscribersCountQuery(
    sub?._id
  );

  const [subscribe] = useSubCriptionMutation();
  const [unsubscribe] = useUnSubCriptionMutation();
  const [isProcessing, setIsProcessing] = useState(false);

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
  }, [subscriptionStatus, subscribersCount, dispatch, sub?._id]);

  const currentSubscriptionStatus = useSelector(
    (state: any) => state.subscription.subscriptionStatus[sub?._id]
  );
  const currentSubscribersCount = useSelector(
    (state: any) => state.subscription.subscribersCount[sub?._id]
  );

  const handleSubCription = async () => {
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
        message.success("Đã đăng ký kênh!");
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex mt-[15px] sm:flex-col sm:text-center md:flex-row md:text-start items-center gap-[15px]">
      <div className="md:w-[160px] md:h-[160px] sm:w-[100px] sm:h-[100px] rounded-[50%] overflow-hidden">
        <Image
          src={sub?.avatar}
          width={160}
          height={160}
          alt="Picture of the author"
          className="w-[100%] h-[100%] object-fill rounded-[12px]"
        />
      </div>
      <div className="flex-1 py-2">
        <h1 className="font-bold text-[25px] mb-3 leading-[32px]">
          {sub?.name}
        </h1>
        <p className="text-[#333] text-[14px]">{sub?.email}</p>
        <div className="flex gap-3 text-[14px]">
          <span>{videoCount?.videoCount} video </span>
          <strong>.</strong>
          <span>{currentSubscribersCount} người đăng ký</span>
        </div>
        <p className="text-[14px]">{sub?.description}</p>
      </div>
      <div className="flex sm:justify-center md:justify-start gap-[10px]">
        <button
          className="bg-[#333] mt-[10px] rounded-[50px] min-w-[120px] text-[#fff] h-[42px]"
          onClick={handleSubCription}
          disabled={isProcessing}
        >
          {currentSubscriptionStatus ? "Đã đăng ký" : "Đăng ký"}
        </button>
      </div>
    </div>
  );
};

export default ChannelItem;
