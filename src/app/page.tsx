import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import dynamic from "next/dynamic";
const CardVideoSkeleton = dynamic(
  () => import("@/components/skeleton/CardVideoSkelenton")
);

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/list`,
    {
      cache: "force-cache",
    }
  );

  const data = await res.json();
  return data.data || [];
}

async function getVideos() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list?page=1&limit=12&category=null&isPublic=true`,
    {
      cache: "force-cache",
    }
  );

  let data = await res.json();
  return data.videos || [];
}

export default async function Page() {
  const [videos, categories] = await Promise.all([
    getVideos(),
    getCategories(),
  ]);

  return (
    <LayoutDefault>
      <div className="flex gap-[10px] mb-[20px] overflow-y-auto">
        <button
          type="button"
          className="bg-[#000] text-[#fff] rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500]"
        >
          Tất cả
        </button>
        {categories?.map((item: any) => (
          <button
            type="button"
            key={item._id}
            className="bg-[#f2f2f2] text-[#000] rounded-[8px] min-w-[90px] h-[32px] text-[14px] font-[500]"
          >
            {item?.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {videos.length > 0
          ? videos.map((item: any) => <VideoCard key={item._id} item={item} />)
          : Array.from({ length: 12 }).map((_, index) => (
              <CardVideoSkeleton key={index} />
            ))}
      </div>
    </LayoutDefault>
  );
}
