"use client";

import { useEffect, useRef, useState } from "react";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import VideoShortCard from "@/components/card/VideoShortCard";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import NextIcon from "@/components/icons/Next";
import PrevIcon from "@/components/icons/Prev";
import { Spin } from "antd";

const ShortPage = () => {
  const [page, setPage] = useState(1);
  const limit = 1;
  const { data: videoShorts, isFetching } = useGetVideoQuery({
    videoType: "short",
    page,
    limit,
    isPublic: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = videoShorts?.total
    ? Math.ceil(videoShorts.total / limit)
    : 1;

  const handleScroll = (event: WheelEvent) => {
    if (isFetching) return;

    if (event.deltaY > 0 && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else if (event.deltaY < 0 && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll);
      return () => container.removeEventListener("wheel", handleScroll);
    }
  }, [page, isFetching, videoShorts]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <LayoutDefault>
      <div
        className="flex flex-col items-center justify-center relative w-full"
        ref={containerRef}
      >
        {videoShorts?.data?.map((item: any) => (
          <VideoShortCard item={item} key={item?._id} />
        ))}
        {isFetching && (
          <div>
            <Spin />
          </div>
        )}

        <div className="absolute right-5 md:flex flex-col gap-4 sm:hidden ">
          <button
            onClick={handlePrev}
            type="button"
            disabled={page === 1}
            className={`p-1 w-[45px] h-[45px] rounded-full flex justify-center items-center ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#eee] hover:bg-gray-400"
            }`}
            aria-label="Go to previous"
          >
            <NextIcon />
          </button>
          <button
            onClick={handleNext}
            type="button"
            disabled={page >= totalPages}
            className={`p-1 w-[45px] h-[45px] rounded-full flex justify-center items-center ${
              page >= totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#eee] hover:bg-gray-400"
            }`}
            aria-label="Go to next"
          >
            <PrevIcon />
          </button>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default ShortPage;
