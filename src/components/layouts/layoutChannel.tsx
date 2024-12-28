"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useGetChannelInfoQuery } from "@/redux/api/channelApi";
import { Skeleton } from "antd";
import { useGetChannelVideoCountQuery } from "@/redux/api/videoApi";
import { useUser } from "@/hook/AuthContext";
import { useSubscription } from "@/hook/useSubscription";

const LayoutChannel = ({ children }: Props) => {
  const params = useParams();
  const pathName = usePathname();
  const { id } = params;
  const { user } = useUser();

  const { data: channel, isLoading } = useGetChannelInfoQuery(id);
  const isOwner = user?.data?._id === channel?.data?._id;
  const channelId = channel?.data?._id;

  const { data: videoCount } = useGetChannelVideoCountQuery(channelId, {
    skip: !channelId,
  });

  const {
    currentSubscriptionStatus,
    currentSubscribersCount,
    handleSubscriptionToggle,
    isProcessing,
  } = useSubscription(channelId, user);

  return (
    <div>
      <div className="w-[100%] md:h-[200px] sm:h-[130px] rounded-[8px] overflow-hidden mb-[10px] bg-slate-50">
        {isLoading ? (
          <Skeleton.Image
            active
            className="!w-[100%] !h-[100%] object-fill rounded-[12px] bg-[#eee]"
          />
        ) : (
          <Image
            src={channel?.data?.background || ""}
            width={1070}
            height={170}
            alt={channel?.data?.name}
            className="w-[100%] h-[100%] object-fill rounded-[12px]"
            priority
          />
        )}
      </div>
      <div className="flex mt-[15px] sm:flex-col sm:text-center md:flex-row md:text-start items-center gap-[15px]">
        <div className="md:w-[160px] md:h-[160px] sm:w-[100px] sm:h-[100px] rounded-[50%] overflow-hidden">
          {isLoading ? (
            <Skeleton.Avatar
              active
              size={160}
              className="w-[100%] h-[100%] rounded-[12px]"
            />
          ) : (
            <Image
              src={channel?.data?.avatar}
              width={160}
              height={160}
              alt={channel?.data?.name}
              className="w-[100%] h-[100%] object-fill rounded-[12px]"
              priority
            />
          )}
        </div>
        <div>
          <h1 className="font-bold text-[30px] leading-[32px]">
            {channel?.data?.name}
          </h1>
          <div className="flex sm:flex-col md:flex-row gap-[10px] my-[5px] text-[#606060] font-medium">
            <span className="text-[#333]">{channel?.data?.email}</span>
            <span>{currentSubscribersCount} người đăng ký</span>
            <span>{videoCount?.videoCount} video</span>
          </div>
          <p>{channel?.data?.description}</p>
          <div className="flex sm:justify-center md:justify-start mt-3 gap-[10px]">
            {!isOwner ? (
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
            ) : (
              <div className="flex gap-3">
                <Link
                  href={`/studio/${user?.data?._id}/channel/${channel?.data?._id}`}
                  target="_blank"
                >
                  <button
                    type="button"
                    className="bg-[#ccc] text-[14px] mt-[10px] px-[10px] rounded-[50px] min-w-[90px] text-[#000] h-[36px]"
                  >
                    Tùy chỉnh kênh
                  </button>
                </Link>
                <Link
                  href={`/studio/${user?.data?._id}/content`}
                  target="_blank"
                >
                  <button
                    type="button"
                    className="bg-[#ccc]  text-[14px] mt-[10px] px-[10px] rounded-[50px] min-w-[90px] text-[#000] h-[36px]"
                  >
                    Quản lý video
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-[30px] py-[20px] mt-[20px]">
        <span
          className={` ${
            pathName === `/channel/${id}/video`
              ? "text-[#000] font-[600] text-[14px] underline underline-offset-8"
              : ""
          }`}
        >
          <Link href={`/channel/${id}/video`}>Video</Link>
        </span>
        <span
          className={` ${
            pathName === `/channel/${id}/short`
              ? "text-[#000] font-[600] text-[14px] underline underline-offset-8"
              : ""
          }`}
        >
          <Link href={`/channel/${id}/short`}>Short</Link>
        </span>
        <span
          className={`font-[500] ${
            pathName === `/channel/${id}/playlist`
              ? "text-[#000] font-[600] text-[14px] underline underline-offset-8"
              : ""
          }`}
        >
          <Link href={`/channel/${id}/playlist`}>Danh sách phát</Link>
        </span>
      </div>
      {children}
    </div>
  );
};

type Props = {
  children: any;
};

export default LayoutChannel;
