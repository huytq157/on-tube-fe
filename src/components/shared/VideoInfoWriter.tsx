"use client";

import { useUser } from "@/hook/AuthContext";
import { useSubscription } from "@/hook/useSubscription";
import Image from "next/image";
import Link from "next/link";

interface ModalProps {
  video: any;
}

const VideoInfoWriter: React.FC<ModalProps> = ({ video }) => {
  const { user } = useUser();
  const channelId = video?.writer?._id;

  const {
    currentSubscriptionStatus,
    currentSubscribersCount,
    handleSubscriptionToggle,
    isProcessing,
  } = useSubscription(channelId, user);

  return (
    <div className=" flex items-center gap-[20px]">
      <div className="flex items-center gap-[15px] md:px-[10px] cursor-pointer rounded-[8px]">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
          <Link href={`/channel/${video?.writer?._id}/playlist`}>
            <Image
              src={video?.writer?.avatar || ""}
              width={40}
              height={40}
              alt={`Avatar của ${video?.writer?.name || "người dùng"}`}
              className="w-[100%] h-[100%]"
              loading="lazy"
            />
            <span className="sr-only">
              Đi đến playlist của {video?.writer?.name || "người dùng"}
            </span>
          </Link>
        </div>
        <div>
          <Link href={`/channel/${video?.writer?._id}/playlist`}>
            <span className="font-roboto text-line-camp-1 text-[#333] text-[15px] font-semibold leading-[20px]">
              {video?.writer?.name}
            </span>
          </Link>
          <span className="font-roboto text-line-camp-1 text-[#606060] leading-[20px]">
            {currentSubscribersCount} người đăng ký
          </span>
        </div>
      </div>
      <div>
        {user?.data?._id !== video?.writer?._id && (
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
        )}
      </div>
    </div>
  );
};

export default VideoInfoWriter;
