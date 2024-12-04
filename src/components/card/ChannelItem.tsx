"use client";

import { useUser } from "@/hook/AuthContext";
import { useSubscription } from "@/hook/useSubscription";
import { useGetChannelVideoCountQuery } from "@/redux/api/videoApi";
import Image from "next/image";

const ChannelItem: React.FC<any> = ({ sub }) => {
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
          type="button"
          className="bg-[#333] mt-[10px] rounded-[50px] min-w-[120px] text-[#fff] h-[42px]"
          onClick={handleSubscriptionToggle}
          disabled={isProcessing}
        >
          {currentSubscriptionStatus ? "Đã đăng ký" : "Đăng ký"}
        </button>
      </div>
    </div>
  );
};

export default ChannelItem;
