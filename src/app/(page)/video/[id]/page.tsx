"use client";

import { Col, Row, Skeleton, Switch } from "antd";
import Image from "next/image";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useDescViewMutation,
  useDescViewAuthMutation,
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
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetPlaylistDetailQuery } from "@/redux/api/playListApi";

const renderHTML = (htmlString: string) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const VideoDetail = () => {
  const params = useParams();
  const { id } = params;
  const searchParams = useSearchParams();
  const fromPlaylist = searchParams.get("from") === "playlist";
  const playlistId = searchParams.get("playlistId");

  const router = useRouter();
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const { data: video } = useGetVideoByIdQuery(id);
  const { data: vieoRecommend } = useGetVideoRecommendQuery(id);
  const { data: playlists } = useGetPlaylistDetailQuery(playlistId);

  console.log("playlist video", playlists);
  console.log("video", video);

  const [descView] = useDescViewMutation();
  const [descViewAuth] = useDescViewAuthMutation();

  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasViewedRef = useRef(false);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const isCurrentVideoPlaying = (videoId: string) => {
    return videoId === id;
  };

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

        const payload = {
          videoId: id,
          watchTime: totalDuration * 0.5,
          ...(token && { userId: user?.user?._id }),
        };

        const descViewFunction = token ? descViewAuth : descView;

        descViewFunction(payload)
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

  const handleVideoEnded = () => {
    if (fromPlaylist && playlists?.playlist?.videos?.length > 0) {
      const currentIndex = playlists.playlist.videos.findIndex(
        (videoItem: any) => videoItem._id === id
      );

      if (
        currentIndex !== -1 &&
        currentIndex < playlists.playlist.videos.length - 1
      ) {
        const nextVideo = playlists.playlist.videos[currentIndex + 1];
        router.push(
          `/video/${nextVideo._id}?from=playlist&playlistId=${playlistId}`
        );
      }
    } else if (autoPlay && vieoRecommend?.data.length > 0) {
      const firstRecommendedVideo = vieoRecommend?.data[0];
      if (firstRecommendedVideo?.videoUrl) {
        const isYouTube = isYouTubeUrl(firstRecommendedVideo.videoUrl);

        if (isYouTube) {
          window.location.href = `https://www.youtube.com/embed/${new URL(
            firstRecommendedVideo.videoUrl
          ).searchParams.get("v")}`;
        } else {
          router.push(`/video/${firstRecommendedVideo._id}`);
        }
      }
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  };

  return (
    <LayoutDefault>
      <Head>
        <title>{video?.video?.title || "on-tube"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:px-[4%] sm:px-0 pb-[20px]">
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
                        title={video?.video?.title}
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
                        onEnded={() => handleVideoEnded()}
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
                      <div className="absolute autoplay bottom-[39px] left-[140px] hidden">
                        <span className="font-medium mr-2 text-[#fff]">
                          Tự động phát
                        </span>
                        <Switch
                          checked={autoPlay}
                          onChange={toggleAutoPlay}
                          className="bg-green-500"
                          size="small"
                        />
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
                      <Link
                        href={`/channel/${video?.video?.writer?._id}/playlist`}
                      >
                        <Image
                          src={video?.video?.writer?.avatar || ""}
                          width={40}
                          height={40}
                          alt=""
                          className="w-[100%] h-[100%]"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={`/channel/${video?.video?.writer?._id}/playlist`}
                      >
                        <span className="text-line-camp-1 text-[#333] font-semibold leading-[20px]">
                          {video?.video?.writer?.name}
                        </span>
                      </Link>
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
                <div>
                  {renderHTML(
                    isExpanded
                      ? video?.video?.description
                      : video?.video?.description.slice(0, 300) + "..."
                  )}{" "}
                  <button
                    className="block font-semibold mt-3"
                    onClick={toggleDescription}
                  >
                    {isExpanded ? "Ẩn bớt" : "Xem thêm..."}{" "}
                  </button>
                </div>
              </div>
              {video?.video?.allowComments === true ? (
                <Comments />
              ) : (
                <p className="font-[500] text-center">
                  Nhà sáng tạo đã tắt bình luận
                </p>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={6}>
            {fromPlaylist && (
              <div className="min-h-[100px] max-h-[500px] overflow-hidden overflow-y-auto w-full border-[1px]  rounded-[10px] p-[15px] mb-4">
                <div className="header">
                  <span className="text-[18px]  font-[600] ">
                    {playlists?.playlist?.title}
                  </span>

                  <div className="flex  gap-[15px] mt-3">
                    <span className="border-[1px] rounded-[10px] px-2">
                      {playlists?.playlist?.isPublic === true
                        ? "Công khai"
                        : "Riêng tư"}
                    </span>
                    <span className="font-[500]">
                      {playlists?.playlist?.writer?.name}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  {playlists?.playlist?.videos
                    .filter((item: any) => item.isPublic)
                    .map((item: any) => (
                      <div
                        key={item?._id}
                        className={`flex gap-[10px] rounded-[10px] p-2  ${
                          isCurrentVideoPlaying(item?._id) ? "bg-[#ccc]" : ""
                        }`}
                      >
                        <div className="rounded-[10px] max-w-[30%] h-[60px] overflow-hidden">
                          <Link
                            href={`/video/${item?._id}?from=playlist&playlistId=${playlistId}`}
                          >
                            <Image
                              src={item?.videoThumbnail || ""}
                              width={120}
                              height={56}
                              alt=""
                              className="w-[100%] h-[100%] object-cover"
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <div className="max-w-[70%]">
                          <Link
                            href={`/video/${item?._id}?from=playlist&playlistId=${playlistId}`}
                          >
                            <h3 className="font-[500] text-[#000] mb-1 leading-[16px] text-line-camp-2">
                              {item?.title}
                            </h3>
                          </Link>
                          <span className="text-[12px] text-[#3b3b3b] font-[400]">
                            {item?.writer?.name}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <VideoRecomment vieoRecommend={vieoRecommend} />
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default VideoDetail;
