"use client";
import { useEffect, useState, useRef } from "react";
import VideoCard from "@/components/card/VideoCard";
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
  const [categories, setCategories] = useState<any>([]); // Danh sách categories
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("null");
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const calculateLimit = () => {
      const screenHeight = window.innerHeight;
      const cardHeight = 250;
      const rows = Math.ceil(screenHeight / cardHeight);
      const columns = 4;
      setLimit(rows * columns);
    };

    calculateLimit();
    window.addEventListener("resize", calculateLimit);

    return () => {
      window.removeEventListener("resize", calculateLimit);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/list`
        );
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchVideos = async (reset = false) => {
    if (fetchingMore || (!hasMore && !reset)) return;
    if (reset) setLoading(true);
    else setFetchingMore(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list?page=${
          reset ? 1 : page
        }&limit=${limit}&category=${selectedCategory}&isPublic=true`
      );
      const data = await res.json();

      setVideos((prevVideos) =>
        reset ? data.videos || [] : [...prevVideos, ...(data.videos || [])]
      );
      setHasMore(data.videos.length > 0);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchVideos(true);
  }, [selectedCategory, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fetchingMore && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchingMore, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchVideos();
    }
  }, [page]);

  return (
    <LayoutDefault>
      <div className="flex gap-[10px] mb-[20px] overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory("null");
            setPage(1);
          }}
          className={`rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500] ${
            selectedCategory === "null"
              ? "bg-[#000] text-[#fff]"
              : "bg-[#f2f2f2] text-[#000]"
          }`}
        >
          Tất cả
        </button>
        {categories?.map((item: any) => (
          <button
            key={item._id}
            type="button"
            onClick={() => {
              setSelectedCategory(item._id);
              setPage(1); // Reset page
            }}
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

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {loading
          ? Array.from({ length: limit }).map((_, index) => (
              <CardVideoSkeleton key={index} />
            ))
          : videos.map((item: any) => <VideoCard key={item._id} item={item} />)}
      </div>

      {fetchingMore && <Spinner />}

      <div ref={observerRef} className="w-full h-10" />
    </LayoutDefault>
  );
}
