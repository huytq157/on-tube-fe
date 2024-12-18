"use client";

import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetVideoTrendingQuery } from "@/redux/api/videoApi";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useState } from "react";

dayjs.extend(isSameOrAfter);

const Trending = () => {
  const [videoType, setVideoType] = useState("long");
  const { data: trendings, isLoading } = useGetVideoTrendingQuery({
    videoType: videoType,
  });

  return (
    <LayoutDefault>
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
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {trendings?.data?.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
              </div>
            ))
          : trendings?.data
              .filter(
                (item: any) =>
                  item.isPublic &&
                  dayjs().isSameOrAfter(dayjs(item.publishedDate), "day")
              )
              .map((item: any) => (
                <div key={item._id}>
                  <VideoCard item={item} />
                </div>
              ))}
      </div>
    </LayoutDefault>
  );
};

export default Trending;
