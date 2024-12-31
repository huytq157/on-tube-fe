"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import VideoInfoWriter from "../shared/VideoInfoWriter";
import VideoAction from "../shared/VideoAction";
import { calculateCreatedTime } from "../utils/formatDate";
import Comments from "../shared/Comment";
import {
  useDescViewAuthMutation,
  useDescViewMutation,
} from "@/redux/api/videoApi";
import { useUser } from "@/hook/AuthContext";
import { VideoCard } from "../types";
import Head from "next/head";
import { Spin } from "antd";

const renderHTML = (htmlString: string) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const VideoDetail: React.FC<VideoCard> = ({ id, video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasViewedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [descView] = useDescViewMutation();
  const [descViewAuth] = useDescViewAuthMutation();
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    document.title = video?.title || "loading...";
  }, [video]);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current && !hasViewedRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (totalDuration > 0 && currentTime >= totalDuration * 0.5) {
        hasViewedRef.current = true;
        if (isAuthenticated) {
          descViewAuth({
            videoId: id,
            watchTime: totalDuration * 0.5,
            userId: user?.data?._id,
          }).unwrap();
        } else {
          descView({ videoId: id, watchTime: totalDuration * 0.5 }).unwrap();
        }
      }
    }
  }, [id, totalDuration, descView]);

  return (
    <div className="mb-10">
      <Head>
        <title>{video?.title || "Video"}</title>
        <meta
          name="description"
          content={video?.description?.slice(0, 160) || ""}
        />
        <meta property="og:title" content={video?.title || "Video"} />
        <meta
          property="og:description"
          content={video?.description?.slice(0, 160) || ""}
        />
        <meta property="og:type" content="video.movie" />
        <meta
          property="og:url"
          content={`https://yourwebsite.com/video/${id}`}
        />
        <meta
          property="og:image"
          content={video?.videoThumbnail || "/default-thumbnail.jpg"}
        />
      </Head>
      <div className="w-full bg-black rounded-[10px]">
        {video?.videoUrl ? (
          <div className="relative pb-[56.25%] h-0 videos">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full"
              controls
              preload="metadata"
              autoPlay={true}
              autoFocus={true}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={video?.videoUrl} type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="w-full bg-slate-200 md:h-[550px] sm:h-[220px] rounded-[10px] overflow-hidden">
            <span className="text-center text-gray-600">
              Không có video để hiển thị
            </span>
          </div>
        )}
      </div>

      <h1 className="font-roboto sm:text-[18px] text-line-camp-2  md:text-[22px] leading-[32px] font-semibold mt-[10px]">
        {video?.title}
      </h1>

      <div className="md:mt-[25px] sm:mt-[15px] flex justify-between flex-wrap gap-[15px]">
        <VideoInfoWriter video={video} />
        <VideoAction videoId={id} />
      </div>

      <div className="bg-[#f2f2f2] rounded-[5px] mt-[20px] mb-[24px] p-[10px]">
        <div className="flex gap-[5px] flex-wrap mb-2 text-[#606060] font-semibold">
          <span className="text-[14px] font-roboto ">
            {video?.totalView} lượt xem
          </span>
          <span className="text-[14px]">•</span>
          <span className="text-[14px] font-roboto">
            {calculateCreatedTime(video?.createdAt)}
          </span>
          <div className="text-[#065FD4] ml-2 gap-1 flex">
            {video?.tags?.map((item: any, index: number) => (
              <span key={index} className="text-[14px] cursor-pointer">
                #{item}
              </span>
            ))}
          </div>
        </div>
        <div className="font-roboto">
          {renderHTML(
            isExpanded
              ? video?.description
              : video?.description.slice(0, 300) + "..."
          )}
          <button
            type="button"
            className="block font-semibold mt-3 font-roboto"
            onClick={toggleDescription}
          >
            {isExpanded ? "Ẩn bớt" : "Xem thêm..."}{" "}
          </button>
        </div>
      </div>

      {video?.allowComments === true ? (
        <Comments videoId={id} video={video} />
      ) : (
        <p className="font-[500] font-roboto text-center">
          Nhà sáng tạo đã tắt bình luận
        </p>
      )}
    </div>
  );
};

export default VideoDetail;
