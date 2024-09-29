"use client";

import React, { useEffect, useState, useRef } from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row, Spin } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

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
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data: categories } = useGetCategoryQuery("");
  const {
    data: videoData,
    isLoading,
    refetch,
  } = useGetVideoQuery({
    page,
    limit: 6,
    category: selectedCategory,
    isPublic: true,
  });

  useEffect(() => {
    if (videoData?.videos) {
      setVideos((prevVideos) => [...prevVideos, ...videoData.videos]);
      setHasMore(videoData.videos.length > 0);
    }
  }, [videoData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
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
    refetch();
    setVideos([]);
    setPage(1);
    setSelectedCategory(categoryId);
  };

  return (
    <LayoutDefault>
      <div className="flex gap-[10px] mb-[20px] overflow-y-auto">
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
        <Row gutter={[18, 48]}>
          {isLoading && !videos.length
            ? Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            : videos
                .filter((item: any) =>
                  dayjs().isSameOrAfter(dayjs(item.publishedDate), "day")
                )
                .map((item: any) => (
                  <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                    <VideoCard item={item} />
                  </Col>
                ))}
        </Row>

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
