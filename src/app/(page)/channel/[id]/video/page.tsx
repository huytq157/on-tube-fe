"use client";

import VideoCard from "@/components/card/VideoCard";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { useParams } from "next/navigation";
import { useState } from "react";

const VideoChannel = () => {
  const params = useParams();
  const { id } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: videos, isLoading } = useGetChannelVideoQuery({
    id,
    isPublic: true,
    page: currentPage,
    limit: pageSize,
    videoType: "long",
  });

  return (
    <div>
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
              <VideoCard item={video} />
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
