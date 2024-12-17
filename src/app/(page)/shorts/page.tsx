"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import VideoShortCard from "@/components/card/VideoShortCard";
import { useGetVideoQuery } from "@/redux/api/videoApi";

const ShortPage = () => {
  const { data: videoShorts } = useGetVideoQuery({ videoType: "short" });

  return (
    <LayoutDefault>
      <div className="flex justify-start py-3 items-center flex-col gap-[40px] min-h-[100vh] overflow-y-auto scroll-snap-y">
        {videoShorts?.data?.map((item: any) => (
          <VideoShortCard item={item} key={item?._id} />
        ))}
      </div>
    </LayoutDefault>
  );
};

export default ShortPage;
