"use client";

import { Col, Row, Skeleton } from "antd";
import Image from "next/image";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useParams } from "next/navigation";
import {
  useDescViewMutation,
  useGetVideoByIdQuery,
  useGetVideoRecommendQuery,
} from "@/redux/api/videoApi";
import VideoRecomment from "@/components/shared/VideoRecomment";
import Comments from "@/components/shared/Comment";
import VideoAction from "@/components/shared/VideoAction";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import SmallScreenIcon from "@/components/icons/SmallScreen";
import { calculateCreatedTime } from "@/components/utils/formatDate";

const VideoDetail = () => {
  const params = useParams();
  const { id } = params;
  const [descView] = useDescViewMutation();

  const { data: video } = useGetVideoByIdQuery(id);
  const { data: vieoRecommend } = useGetVideoRecommendQuery(id);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasViewedRef = useRef(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    if (video?.video?.title) {
      document.title = video.video.title;
    }
  }, [video]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration);
    }
  };
  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const handlePictureInPicture = async () => {
    if (videoRef.current) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    }
  };

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current && !hasViewedRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (totalDuration > 0 && currentTime >= totalDuration * 0.5) {
        hasViewedRef.current = true;
        descView({ videoId: id, watchTime: totalDuration * 0.5 })
          .unwrap()
          .then(() => {
            console.log("descView called successfully");
          })
          .catch((error) => {
            console.error("Error updating view", error);
          });
      }
    }
  }, [id, totalDuration, descView]);

  return (
    <LayoutDefault>
      <Head>
        <title>{video?.video?.title || "on-tube"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:px-[4%] sm:px-0">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
            <div className="min-h-[100vh] overflow-hidden">
              <div className="w-full bg-black rounded-[10px] overflow-hidden">
                {video?.video?.videoUrl ? (
                  isYouTubeUrl(video.video.videoUrl) ? (
                    <div className="relative pb-[56.25%] h-0">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${new URL(
                          video.video.videoUrl
                        ).searchParams.get("v")}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative pb-[56.25%] h-0 videos">
                      <video
                        ref={videoRef}
                        className="absolute top-0 left-0 w-full h-full "
                        controls
                        preload="metadata"
                        autoPlay={true}
                        autoFocus={true}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                      >
                        <source src={video?.video?.videoUrl} type="video/mp4" />
                        <track
                          src="/path/to/captions.vtt"
                          kind="subtitles"
                          srcLang="en"
                          label="English"
                        />
                        Your browser does not support the video tag.
                      </video>

                      <div className="custom-controls">
                        <button
                          className="custom-button bg-[#333] text-white p-2 rounded-md mt-2"
                          onClick={handlePictureInPicture}
                        >
                          <SmallScreenIcon />
                          {}
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full bg-slate-200 md:h-[550px] sm:h-[220px] rounded-[10px] overflow-hidden">
                    <Skeleton.Input
                      active
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-[10px]"
                    />
                  </div>
                )}
              </div>

              <h1 className="sm:text-[18px] md:text-[22px] leading-[32px] font-semibold mt-[10px]">
                {video?.video?.title}
              </h1>
              <div className="md:mt-[25px] sm:mt-[15px] flex justify-between flex-wrap gap-[15px]">
                <div className=" flex items-center gap-[20px]">
                  <div className="flex items-center gap-[15px] md:px-[10px] cursor-pointer rounded-[8px]">
                    <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
                      <Image
                        src={video?.video?.writer?.avatar || ""}
                        width={40}
                        height={40}
                        alt=""
                        className="w-[100%] h-[100%]"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <span className="text-line-camp-1 font-semibold leading-[20px]">
                        {video?.video?.writer?.name}
                      </span>
                      <span className="text-line-camp-1 text-[#606060] leading-[20px]">
                        16 người đăng ký
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#333] rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                      Đăng ký
                    </button>
                  </div>
                </div>
                <VideoAction />
              </div>
              <div className="bg-[#f2f2f2] rounded-[5px] mt-[20px] mb-[24px] p-[10px]">
                <div className="flex gap-[5px] flex-wrap mb-2 text-[#606060] font-semibold">
                  <span className="text-[14px]">
                    {video?.video?.totalView} lượt xem
                  </span>
                  <span className="text-[14px]">•</span>
                  <span className="text-[14px]">
                    {calculateCreatedTime(video?.video?.createdAt)}
                  </span>
                  <div className="text-[#065FD4] ml-2 gap-1 flex">
                    {video?.video?.tags?.map((item: any, index: number) => (
                      <span key={index} className="text-[14px] cursor-pointer">
                        #{item}
                      </span>
                    ))}
                  </div>
                </div>
                {video?.video?.description}
                <button className="block font-semibold mt-3">Ẩn bớt</button>
              </div>

              <Comments />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={6}>
            <VideoRecomment vieoRecommend={vieoRecommend} />
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default VideoDetail;
