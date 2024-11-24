"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import {
  useCheckSubCriptionQuery,
  useGetChannelSubscribersCountQuery,
  useSubCriptionMutation,
  useUnSubCriptionMutation,
} from "@/redux/api/subcription";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { message, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

interface ModalProps {
  video: any;
  videoLoading: boolean;
}

const VideoInfoWriter: React.FC<ModalProps> = ({ video, videoLoading }) => {
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const channelId = video?.video?.writer?._id;
  const [subscribe] = useSubCriptionMutation();
  const [unsubscribe] = useUnSubCriptionMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: subscriptionStatus, isLoading: isCheckingSubscription } =
    useCheckSubCriptionQuery(channelId, {
      skip: !user,
    });

  const { data: subscribersCount } = useGetChannelSubscribersCountQuery(
    channelId,
    { skip: !channelId }
  );

  const handleSubCription = async () => {
    if (!user) {
      message.warning("Bạn phải đăng nhập để đăng ký!");
      return;
    }
    if (!channelId) return;

    try {
      setIsProcessing(true);

      if (subscriptionStatus?.subscribed) {
        await unsubscribe({ channelId }).unwrap();
        message.success("Đã hủy đăng ký kênh!");
      } else {
        await subscribe({ channelId }).unwrap();
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
    <div className=" flex items-center gap-[20px]">
      <div className="flex items-center gap-[15px] md:px-[10px] cursor-pointer rounded-[8px]">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
          {videoLoading ? (
            <div className="flex items-center">
              <Skeleton.Avatar active size={40} className="mr-2" />
            </div>
          ) : (
            <Link href={`/channel/${video?.video?.writer?._id}/playlist`}>
              <Image
                src={video?.video?.writer?.avatar || ""}
                width={40}
                height={40}
                alt=""
                className="w-[100%] h-[100%]"
                loading="lazy"
              />
            </Link>
          )}
        </div>
        <div>
          <Link href={`/channel/${video?.video?.writer?._id}/playlist`}>
            <span className="font-roboto text-line-camp-1 text-[#333] text-[15px] font-semibold leading-[20px]">
              {video?.video?.writer?.name}
            </span>
          </Link>
          <span className="font-roboto text-line-camp-1 text-[#606060] leading-[20px]">
            {subscribersCount?.count} người đăng ký
          </span>
        </div>
      </div>
      <div>
        {user?.user?._id !== video?.video?.writer?._id && (
          <button
            className="bg-[#333] rounded-[50px] px-3 min-w-[90px] text-[#fff] h-[36px] font-roboto"
            onClick={handleSubCription}
            disabled={isCheckingSubscription || isProcessing}
          >
            {subscriptionStatus?.subscribed === true ? "Đã đăng ký" : "Đăng ký"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoInfoWriter;
