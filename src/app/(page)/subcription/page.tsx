"use client";

import VideoCard from "@/components/card/VideoCard";
import FavouriteIcon from "@/components/icons/Favourite";
import GridIcon from "@/components/icons/Grid";
import GridDetail from "@/components/icons/GridDetail";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useListVideoSubcriptionQuery } from "@/redux/api/subcription";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useRouter } from "next/navigation";
import { useUser } from "@/hook/AuthContext";

dayjs.extend(isSameOrAfter);

const Subscription = () => {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const { data: videos, isLoading } = useListVideoSubcriptionQuery("", {
    skip: !isAuthenticated,
  });

  return (
    <LayoutDefault>
      <div className="px-[10px] pt-[10px]">
        {isAuthenticated ? (
          <React.Fragment>
            <div className="flex items-center justify-end gap-[15px] mb-[20px]">
              <button
                type="button"
                className="bg-[#333]  rounded-[50px] min-w-[90px] text-[#fff] h-[36px]"
                onClick={() => router.push("/channel-sub")}
              >
                Quản lý
              </button>
              <button aria-label="Grid View" type="button">
                <GridIcon />
              </button>
              <button aria-label="Grid View" type="button">
                <GridDetail />
              </button>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
              {isLoading && isAuthenticated ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={index}>
                    <CardVideoSkeleton />
                  </div>
                ))
              ) : videos?.data && videos.data.length > 0 ? (
                videos.data
                  .filter((item: any) =>
                    dayjs().isSameOrAfter(dayjs(item.publishedDate), "day")
                  )
                  .map((item: any) => (
                    <div key={item._id}>
                      <VideoCard item={item} />
                    </div>
                  ))
              ) : (
                <div className="text-center col-span-full py-10">
                  <p>Không có video đăng ký kênh nào.</p>
                </div>
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className="h-[80vh] flex flex-col justify-center  text-center">
            <div className="flex justify-center mb-[10px]">
              <FavouriteIcon />
            </div>
            <span className="text-[22px] font-[500] my-[20px]">
              Đừng bỏ lỡ video mới
            </span>
            <p className="py-[15px]">
              Đăng nhập để xem cập nhật từ các kênh Youtube yêu thích của bạn
            </p>
            <Link href="/login">
              <button
                type="button"
                className="bg-[#333] rounded-[50px] px-[15px] min-w-[90px] text-[#fff] h-[36px]"
              >
                Đăng nhập
              </button>
            </Link>
          </div>
        )}
      </div>
    </LayoutDefault>
  );
};

export default Subscription;
