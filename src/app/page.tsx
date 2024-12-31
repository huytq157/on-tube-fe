"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import dynamic from "next/dynamic";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useMediaQuery } from "react-responsive";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [filterLoading, setFilterLoading] = useState(false);

  const { data: videoResponse, isLoading } = useGetVideoQuery({
    videoType: "long",
    category: selectedCategory,
    page,
    limit: isMobile ? 3 : 12,
    isPublic: true,
  });

  const { data: categories } = useGetCategoryQuery("");

  useEffect(() => {
    if (videoResponse) {
      if (page === 1) {
        setVideos(videoResponse.data);
      } else {
        setVideos((prev) => [...prev, ...videoResponse.data]);
      }
      setHasMore(videoResponse.hasMore);
      setFilterLoading(false);
    }
  }, [videoResponse]);

  const handleCategoryClick = (categoryId: string | null) => {
    setFilterLoading(true);
    setSelectedCategory(categoryId);
    setPage(1);
    setHasMore(false);
    setVideos([]);
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "30px",
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <LayoutDefault>
      <div className="flex gap-[10px] mb-[20px] overflow-y-auto">
        <button
          type="button"
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            selectedCategory === null ? "bg-[#000] text-[#fff]" : "bg-[#ccc]"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          Tất cả
        </button>
        {categories?.data.map((item: any) => (
          <button
            key={item._id}
            type="button"
            className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
              selectedCategory === item._id
                ? "bg-[#000] text-[#fff]"
                : "bg-[#ccc]"
            }`}
            onClick={() => handleCategoryClick(item?._id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="overflow-x-hidden grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-9">
        {filterLoading || isLoading
          ? Array.from({ length: isMobile ? 3 : 12 }).map((_, index) => (
              <CardVideoSkeleton key={index} />
            ))
          : videos.map((item: any) => <VideoCard key={item._id} item={item} />)}
      </div>

      <div
        ref={loaderRef}
        className="h-[40px] flex justify-center items-center"
      >
        {hasMore && !isLoading && (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        )}
        {!hasMore && <p>...</p>}
      </div>
    </LayoutDefault>
  );
}
