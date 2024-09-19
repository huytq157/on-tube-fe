// import React from "react";
// import VideoCard from "@/components/card/VideoCard";
// import { Col, Row } from "antd";
// import LayoutDefault from "@/components/layouts/default/LayoutDefault";
// import Category from "@/components/shared/Category";
// import dynamic from "next/dynamic";

// const CardVideoSkeleton = dynamic(
//   () => import("../components/skeleton/CardVideoSkelenton"),
//   {
//     ssr: false,
//   }
// );
// interface Writer {
//   avatar: string;
//   name: string;
// }

// interface Video {
//   _id: string;
//   title: string;
//   totalView: number;
//   createdAt: Date;
//   videoUrl: string;
//   videoThumbnail: string;
//   writer: Writer;
// }

// const fetchVideos = async (): Promise<Video[]> => {
//   try {
//     // const res = await fetch(
//     //   "https://youtube-backend-k4cj.onrender.com/api/video/list",
//     //   {
//     //     cache: "no-store",
//     //   }
//     // );

//     // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/video/list`, {
//     //   cache: "no-store",
//     // });

//     const res = await fetch("http://localhost:8000/api/video/list", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch data, received status ${res.status}`);
//     }

//     const data = await res.json();
//     return data.videos || [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export default async function Home() {
//   const videos = await fetchVideos();

//   return (
//     <LayoutDefault>
//       <Category />
//       <div>
//         <Row gutter={[18, 48]}>
//           {videos.length === 0
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
//                   <CardVideoSkeleton />
//                 </Col>
//               ))
//             : videos.map((item) => (
//                 <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
//                   <VideoCard item={item} />
//                 </Col>
//               ))}
//         </Row>
//       </div>
//     </LayoutDefault>
//   );
// }

"use client";

import React from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import Category from "@/components/shared/Category";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";

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
  const { data: video, isLoading } = useGetVideoQuery("");
  const videos: Video[] = video?.videos || [];
  return (
    <LayoutDefault>
      <Category />
      <div>
        <Row gutter={[18, 48]}>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            : videos.map((item: any) => (
                <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <VideoCard item={item} />
                </Col>
              ))}
        </Row>
      </div>
    </LayoutDefault>
  );
}
