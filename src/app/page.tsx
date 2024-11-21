"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row, Spin } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useMediaQuery } from "react-responsive";

dayjs.extend(isSameOrAfter);

interface Writer {
  avatar: string;
  name: string;
}

interface Video {
  _id: string;
  title: string;
  totalView: number;
  createdAt: Date;
  videoUrl: string;
  videoThumbnail: string;
  writer: Writer;
}

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data: categories } = useGetCategoryQuery("");

  const {
    data: videoData,
    isLoading,
    refetch,
  } = useGetVideoQuery({
    page,
    limit: isMobile ? 3 : 12,
    category: selectedCategory,
    isPublic: true,
  });

  const skeletonLength = isMobile ? 3 : 8;

  useEffect(() => {
    if (videoData?.videos) {
      setVideos((prevVideos) => [...prevVideos, ...videoData.videos]);
      setHasMore(videoData.videos.length > 0);
      setLoadingSkeleton(false);
    }
  }, [videoData]);

  const memoizedVideos = useMemo(() => {
    return videos.filter((item: any) =>
      dayjs().isSameOrAfter(dayjs(item.publishedDate), "day")
    );
  }, [videos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading]);

  const handleCategoryChange = (categoryId: string | null) => {
    setLoadingSkeleton(true);
    setVideos([]);
    setPage(1);
    setSelectedCategory(categoryId);
    refetch();
  };

  return (
    <LayoutDefault>
      <div className="flex  gap-[10px] mb-[20px] overflow-y-auto">
        <button
          className={`${
            !selectedCategory
              ? "bg-[#333] text-[#fff]"
              : "bg-[#f2f2f2] text-[#000]"
          } rounded-[8px] min-w-[90px] text-[14px] h-[32px] px-[10px]`}
          onClick={() => handleCategoryChange(null)}
        >
          Tất cả
        </button>
        {categories?.data?.map((item: any) => (
          <button
            key={item._id}
            className={`${
              selectedCategory === item._id
                ? "bg-[#333] text-[#fff]"
                : "bg-[#f2f2f2] text-[#000]"
            } rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500]`}
            onClick={() => handleCategoryChange(item._id)}
          >
            {item?.title}
          </button>
        ))}
      </div>

      <div>
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
          {(loadingSkeleton || isLoading) && !videos.length
            ? Array.from({ length: skeletonLength + 3 }).map((_, index) => (
                <div key={index}>
                  <CardVideoSkeleton />
                </div>
              ))
            : memoizedVideos.map((item: any) => (
                <div key={item._id}>
                  <VideoCard item={item} />
                </div>
              ))}
        </div>

        <div
          ref={loaderRef}
          className="h-[50px] flex justify-center items-center"
        >
          {isLoading && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          )}
        </div>
      </div>
    </LayoutDefault>
  );
}
