"use client";

import { useState, useEffect } from "react";
import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import dynamic from "next/dynamic";
import { useGetVideoQuery } from "@/redux/api/videoApi";

const CardVideoSkeleton = dynamic(
  () => import("@/components/skeleton/CardVideoSkelenton")
);

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("null");
  const { data: videos } = useGetVideoQuery({
    videoType: "long",
    category: null,
    page: 1,
    limit: 12,
    isPublic: true,
  });

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

      <div className="overflow-x-hidden grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {videos?.data?.length === 0
          ? Array.from({ length: 12 }).map((_, index) => (
              <CardVideoSkeleton key={index} />
            ))
          : videos?.data?.map((item: any) => (
              <VideoCard key={item._id} item={item} />
            ))}
      </div>
    </LayoutDefault>
  );
}
