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
    <div className="flex justify-center items-center gap-2">
      <div className="md:w-[100px] md:h-[100px] sm:w-[60px]  sm:h-[60px] rounded-[50%] overflow-hidden">
        <Image
          src={sub?.avatar}
          width={55}
          height={55}
          alt="Picture of the author"
          className="w-[100%] h-[100%] object-fill"
          priority
        />
      </div>
      <div className="flex-1 items-center flex  md:flex-row justify-between">
        <div className="py-1">
          <h1 className="font-bold text-[18px] mb-1 leading-[32px]">
            {sub?.name}
          </h1>
          <p className="text-[#333] text-[14px]">{sub?.email}</p>
          <div className="flex gap-2 text-[14px]">
            <span>{videoCount?.videoCount} video </span>
            <span>•</span>
            <span>{currentSubscribersCount} người đăng ký</span>
          </div>
          <p className="text-[14px]">{sub?.description}</p>
        </div>
        {user?.data?._id !== sub?._id && (
          <div className="flex justify-start gap-[10px]">
            <button
              type="button"
              className={` ${
                currentSubscriptionStatus
                  ? "bg-[#ccc] text-[#000]"
                  : "bg-[#333] text-[#fff]"
              }  rounded-[50px] px-3 min-w-[90px] h-[36px] font-roboto`}
              onClick={handleSubscriptionToggle}
              disabled={isProcessing}
            >
              {currentSubscriptionStatus ? "Đã đăng ký" : "Đăng ký"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelItem;
