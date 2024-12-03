import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

async function getTrendingVideos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/trending`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending videos");
  }

  const data = await res.json();
  return data?.data || [];
}

export default async function Trending() {
  let trendings = [];
  try {
    trendings = await getTrendingVideos();
  } catch (error) {
    console.error(error);
  }

  return (
    <LayoutDefault>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {trendings.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
              </div>
            ))
          : trendings
              .filter(
                (item: any) =>
                  item.isPublic &&
                  dayjs().isSameOrAfter(dayjs(item.publishedDate), "day")
              )
              .map((item: any) => (
                <div key={item._id}>
                  <VideoCard item={item} />
                </div>
              ))}
      </div>
    </LayoutDefault>
  );
}
