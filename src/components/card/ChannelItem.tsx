"use client";

import { useUser } from "@/hook/AuthContext";
import { useSubscription } from "@/hook/useSubscription";
import { useGetChannelVideoCountQuery } from "@/redux/api/videoApi";
import Image from "next/image";
import { ChannelItems } from "../types";

const ChannelItem: React.FC<ChannelItems> = ({ sub }) => {
  const channelId = sub?._id;
  const { data: videoCount } = useGetChannelVideoCountQuery(sub?._id);
  const { user } = useUser();

  const {
    currentSubscriptionStatus,
    currentSubscribersCount,
    handleSubscriptionToggle,
    isProcessing,
  } = useSubscription(channelId, user);

  return (
    <div className="flex justify-center md:px-[25%] items-center gap-5">
      <div className="md:w-[160px] md:h-[160px] sm:w-[80px]  sm:h-[80px] rounded-[50%] overflow-hidden">
        <Image
          src={sub?.avatar}
          width={60}
          height={60}
          alt="Picture of the author"
          className="w-[100%] h-[100%] object-fill"
          loading="lazy"
        />
      </div>
      <div className="flex-1 flex sm:flex-col md:flex-row justify-between">
        <div className="py-1">
          <h1 className="font-bold text-[22px] mb-1 leading-[32px]">
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
        <div className="flex justify-start gap-[10px]">
          <button
            type="button"
            className="bg-[#333]  rounded-[50px] md:min-w-[120px] sm:min-w-[90px] text-[#fff] md:h-[42px] sm:h-[32px]"
            onClick={handleSubscriptionToggle}
            disabled={isProcessing}
          >
            {currentSubscriptionStatus ? "Đã đăng ký" : "Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
