"use client";

import VideoCard from "@/components/card/VideoCard";
import VideoItem from "@/components/card/VideoItem";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const VideoChannel = () => {
  const params = useParams();
  const { id } = params;
  const [sortBy, setSortBy] = useState<string>("newest");
  const [sortByPopularity, setSortByPopularity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { data: videos, isLoading } = useGetChannelVideoQuery({
    id,
    isPublic: true,
    page: currentPage,
    limit: pageSize,
    videoType: "long",
    sortBy: sortBy,
    sortByPopularity: sortByPopularity,
  });

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            sortBy === "newest" ? "bg-[#000] text-[#fff]" : "bg-[#ccc]"
          }`}
          onClick={() => setSortBy("newest")}
        >
          Mới nhất
        </button>
        <button
          type="button"
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            sortBy === "oldest" ? "bg-[#000] text-[#fff]" : "bg-[#ccc]"
          }`}
          onClick={() => setSortBy("oldest")}
        >
          Cũ nhất
        </button>
        {/* <button
          type="button"
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            sortByPopularity === "popular"
              ? "bg-[#000] text-[#fff]"
              : "bg-[#ccc]"
          }`}
          onClick={() => {
            setSortByPopularity("popular");
            setSortBy("");
          }}
        >
          Phổ biến
        </button> */}
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <CardVideoSkeleton />
            </div>
          ))
        ) : videos?.data.length > 0 ? (
          videos.data.map((video: any) => (
            <div key={video._id}>
              {isMobile ? (
                <VideoItem video={video} />
              ) : (
                <VideoCard item={video} />
              )}
            </div>
          ))
        ) : (
          <p className="text-[14px]">Chưa có video nào</p>
        )}
      </div>
    </div>
  );
};

export default VideoChannel;
