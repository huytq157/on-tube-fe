"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useGetChannelInfoQuery } from "@/redux/api/channelApi";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/redux/api/authApi";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { Skeleton } from "antd";

const LayoutChannel = ({ children }: Props) => {
  const params = useParams();
  const pathName = usePathname();
  const { id } = params;

  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const { data: channel, isLoading } = useGetChannelInfoQuery(id);

  const isOwner = user?.user?._id === channel?.channel?._id;

  return (
    <div>
      <div className="w-[100%] md:h-[180px] sm:h-[130px] rounded-[8px] overflow-hidden mb-[10px] bg-slate-50">
        {isLoading ? (
          <Skeleton.Image
            active
            className="!w-[100%] !h-[100%] object-fill rounded-[12px] bg-[#eee]"
          />
        ) : (
          <Image
            src={channel?.channel?.background}
            width={1070}
            height={170}
            alt={channel?.channel?.name}
            className="w-[100%] h-[100%] object-fill rounded-[12px]"
            loading="lazy"
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
              src={channel?.channel?.avatar}
              width={160}
              height={160}
              alt={channel?.channel?.name}
              className="w-[100%] h-[100%] object-fill rounded-[12px]"
              loading="lazy"
            />
          )}
        </div>
        <div>
          <h1 className="font-bold text-[30px] leading-[32px]">
            {channel?.channel?.name}
          </h1>
          <div className="flex sm:flex-col md:flex-row gap-[15px] my-[5px] text-[#606060] font-medium">
            <span className="text-[#333]">{channel?.channel?.email}</span>
            <span>22 người đăng ký</span>
          </div>
          <p>{channel?.channel?.description}</p>
          <div className="flex sm:justify-center md:justify-start gap-[10px]">
            {!isOwner ? (
              <button className="bg-[#333] mt-[10px] rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                Đăng ký
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  href={`/studio/${user?.user?._id}/channel/${channel?.channel?._id}`}
                  target="_blank"
                >
                  <button className="bg-[#ccc] text-[14px] mt-[10px] px-[10px] rounded-[50px] min-w-[90px] text-[#000] h-[36px]">
                    Tùy chỉnh kênh
                  </button>
                </Link>
                <Link
                  href={`/studio/${user?.user?._id}/content`}
                  target="_blank"
                >
                  <button className="bg-[#ccc]  text-[14px] mt-[10px] px-[10px] rounded-[50px] min-w-[90px] text-[#000] h-[36px]">
                    Quản lý video
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-[30px] py-[20px] my-[20px]">
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
