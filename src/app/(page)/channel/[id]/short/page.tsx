"use client";

import VideoCard from "@/components/card/VideoCard";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { useParams } from "next/navigation";

const ShortChannel = () => {
  const params = useParams();
  const { id } = params;

  const { data: videos, isLoading } = useGetChannelVideoQuery({
    id,
    isPublic: true,
    page: 1,
    limit: 12,
    videoType: "short",
  });

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {videos?.data?.map((video: any) => (
          <div key={video._id}>
            <VideoCard item={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortChannel;
