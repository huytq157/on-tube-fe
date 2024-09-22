"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row, Spin } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import Category from "@/components/shared/Category";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";

interface Writer {
  _id: string;
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
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchVideos = async (page: number) => {
    setIsFetchingMore(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/video/list?page=${page}&limit=6`
      );

      const data = await response.json();
      if (data.videos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prevVideos) => [...prevVideos, ...data.videos]);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchVideos(page);
  }, [page]);

  const lastVideoRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingMore || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingMore, hasMore]
  );

  return (
    <LayoutDefault>
      <Category />
      <div>
        <Row gutter={[18, 48]}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            : videos.map((item, index) => (
                <Col
                  key={item._id}
                  xs={24}
                  sm={12}
                  lg={8}
                  xl={8}
                  xxl={6}
                  ref={videos.length === index + 1 ? lastVideoRef : null}
                >
                  <VideoCard item={item} />
                </Col>
              ))}
        </Row>
        {isFetchingMore && hasMore && (
          <div className="loading-spinner flex justify-center">
            <Spin size="large" />
          </div>
        )}
      </div>
    </LayoutDefault>
  );
}

// import React from "react";
// import VideoCard from "@/components/card/VideoCard";
// import { Col, Row } from "antd";
// import LayoutDefault from "@/components/layouts/default/LayoutDefault";
// import Category from "@/components/shared/Category";

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
//     const res = await fetch(
//       "https://youtube-backend-k4cj.onrender.com/api/video/list",
//       {
//         cache: "no-store",
//       }
//     );

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
//           {videos.map((item) => (
//             <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
//               <VideoCard item={item} />
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </LayoutDefault>
//   );
// }

// "use client";

// import React from "react";
// import VideoCard from "@/components/card/VideoCard";
// import { Col, Row } from "antd";
// import LayoutDefault from "@/components/layouts/default/LayoutDefault";
// import Category from "@/components/shared/Category";
// import { useGetVideoQuery } from "@/redux/api/videoApi";
// import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";

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

// export default function Home() {
//   const { data: video, isLoading } = useGetVideoQuery("");
//   const videos: Video[] = video?.videos || [];
//   return (
//     <LayoutDefault>
//       <Category />
//       <div>
//         <Row gutter={[18, 48]}>
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
//                   <CardVideoSkeleton />
//                 </Col>
//               ))
//             : videos.map((item: any) => (
//                 <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
//                   <VideoCard item={item} />
//                 </Col>
//               ))}
//         </Row>
//       </div>
//     </LayoutDefault>
//   );
// }
