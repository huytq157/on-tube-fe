"use client";

import { useEffect, useRef, useState } from "react";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import VideoShortCard from "@/components/card/VideoShortCard";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import NextIcon from "@/components/icons/Next";
import PrevIcon from "@/components/icons/Prev";
import VideoShortSkeleton from "@/components/skeleton/VideoShortSkeleton";

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
  let touchStartY: number | null = null;
  const totalPages = videoShorts?.total
    ? Math.ceil(videoShorts.total / limit)
    : 1;

  const handleScroll = (event: WheelEvent | TouchEvent) => {
    if (isFetching) return;

    if ("deltaY" in event) {
      if (event.deltaY > 0 && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      } else if (event.deltaY < 0 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      }
    } else {
      const touch = (event as TouchEvent).touches[0];
      if (!touchStartY) return;

      const deltaY = touchStartY - touch.clientY;
      if (deltaY > 20 && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      } else if (deltaY < -20 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      }
      touchStartY = null;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    let touchStartY: number | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    if (container) {
      container.addEventListener("wheel", handleScroll);
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleScroll);

      return () => {
        container.removeEventListener("wheel", handleScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleScroll);
      };
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
        {isFetching
          ? [...Array(limit)].map((_, index) => (
              <VideoShortSkeleton key={index} />
            ))
          : videoShorts?.data?.map((item: any) => (
              <VideoShortCard item={item} key={item?._id} />
            ))}

        <div className="absolute right-2   flex flex-col gap-5">
          {page !== 1 && (
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
          )}

          {!(page >= totalPages) && (
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
          )}
        </div>
      </div>
    </LayoutDefault>
  );
};

export default ShortPage;
