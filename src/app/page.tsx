"use client";

import { useState, useEffect } from "react";
import VideoCard from "@/components/card/VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import dynamic from "next/dynamic";

const CardVideoSkeleton = dynamic(
  () => import("@/components/skeleton/CardVideoSkelenton")
);

const Spinner = () => (
  <div className="flex justify-center items-center w-full h-20">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
  </div>
);

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("null");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/list`
        );
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchVideos(true);
  }, [selectedCategory]);

  const fetchVideos = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list?page=${currentPage}&limit=${limit}&category=${selectedCategory}&isPublic=true&videoType=long`
      );
      const data = await response.json();

      if (!data?.data || data.data.length === 0) {
        setHasMore(false);
        return;
      }

      if (reset) {
        setVideos(data.data);
        setPage(2);
      } else {
        setVideos((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1);
      }

      setHasMore(currentPage < data.totalPage);
    } catch (error) {
      console.error("Failed to fetch videos", error);
      setHasMore(false);
    }
  };

  return (
    <LayoutDefault>
      <div className="flex gap-[10px] mb-[20px]">
        <button
          type="button"
          onClick={() => setSelectedCategory("null")}
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            selectedCategory === "null"
              ? "bg-[#000] text-[#fff]"
              : "bg-[#f2f2f2] text-[#000]"
          }`}
        >
          Tất cả
        </button>
        {categories.map((item: any) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setSelectedCategory(item._id)}
            className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
              selectedCategory === item._id
                ? "bg-[#000] text-[#fff]"
                : "bg-[#f2f2f2] text-[#000]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <InfiniteScroll
        dataLength={videos.length}
        next={() => fetchVideos(false)}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={
          <p className="text-center mt-4 text-gray-500">
            Không còn video nào nữa.
          </p>
        }
      >
        <div className="overflow-x-hidden grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
          {videos.length === 0
            ? Array.from({ length: limit }).map((_, index) => (
                <CardVideoSkeleton key={index} />
              ))
            : videos.map((item: any) => (
                <VideoCard key={item._id} item={item} />
              ))}
        </div>
      </InfiniteScroll>
    </LayoutDefault>
  );
}
