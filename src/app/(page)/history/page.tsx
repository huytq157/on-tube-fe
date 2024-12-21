"use client";

import VideoItem from "@/components/card/VideoItem";
import HistoryIcon from "@/components/icons/History";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetVideoHistoryQuery } from "@/redux/api/videoApi";
import { Spin } from "antd";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import { useUser } from "@/hook/AuthContext";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useMediaQuery } from "react-responsive";
import VideoCard from "@/components/card/VideoCard";
import { useState } from "react";

const History = () => {
  const { user, isAuthenticated } = useUser();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [videoType, setVideoType] = useState("long");
  const { data: historys, isLoading } = useGetVideoHistoryQuery(
    {
      userId: user?.data?._id,
      videoType: videoType,
    },
    {
      skip: !isAuthenticated,
    }
  );

  return (
    <LayoutDefault>
      {user && isAuthenticated ? (
        <>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setVideoType("long")}
              type="button"
              className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
                videoType === "long"
                  ? "bg-[#333] text-[#fff]"
                  : "bg-[#ccc] text-[#000]"
              }`}
            >
              Video
            </button>
            <button
              onClick={() => setVideoType("short")}
              type="button"
              className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
                videoType === "short"
                  ? "bg-[#333] text-[#fff]"
                  : "bg-[#ccc] text-[#000]"
              }`}
            >
              Short
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-5">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <CardVideoSkeleton />
                </div>
              ))
            ) : historys?.data.length > 0 ? (
              historys?.data.map((video: any) => (
                <div key={video._id}>
                  {isMobile ? (
                    <VideoItem video={video?.video} />
                  ) : (
                    <VideoCard item={video?.video} />
                  )}
                </div>
              ))
            ) : (
              <p className="text-[14px]">Chưa có video nào</p>
            )}
          </div>
        </>
      ) : (
        <div className="h-[100vh] flex justify-center pt-[100px] text-center">
          <div>
            <div className="flex justify-center mb-[10px]">
              <HistoryIcon />
            </div>
            <span className="text-[22px] font-[500] my-[20px]">
              Theo dõi nội dung mà bạn xem
            </span>
            <p className="py-[15px]">
              Bạn không thể xem được nhật kí xem khi đã đăng xuất
            </p>
            <Link href="/login">
              <button
                type="button"
                className="bg-[#333] rounded-[50px] px-[15px] min-w-[90px] text-[#fff] h-[36px]"
              >
                Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      )}
    </LayoutDefault>
  );
};

export default History;
