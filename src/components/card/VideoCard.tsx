"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CheckIcon from "../icons/Check";
import Option2Icon from "../icons/Option2";
import TooltipButton from "../shared/TooltipButton";
import { Dropdown, MenuProps } from "antd";
import ListIcon from "../icons/List";
import Link from "next/link";
import { calculateCreatedTime } from "../utils/formatDate";
import AudioIcon from "../icons/Audio";
import Audio2Icon from "../icons/Audio2";
import ModalSave from "../shared/ModalSave";

interface VideoCardProps {
  item: {
    _id: string;
    title: string;
    totalView: number;
    createdAt: Date;
    videoUrl: string;
    videoThumbnail: string;
    isPublic: boolean;
    publishedDate: Date;
    writer: {
      _id: string;
      avatar: string;
      name: string;
    };
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ item }) => {
  const [duration, setDuration] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressThumbRef = useRef<HTMLDivElement | null>(null);
  const [formattedTime, setFormattedTime] = useState<string>("00:00");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setFormattedTime(formatTime(video.duration - video.currentTime));
      };

      video.addEventListener("timeupdate", updateTime);

      return () => {
        video.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [videoRef.current]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const videoElement = event.currentTarget;
    const seconds = Math.floor(videoElement.duration);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setDuration(
      `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
    );
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((error) => console.error("Play error:", error));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current;
    if (videoRef.current && progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const progressBarStyle = {
    width: `${(currentTime / (videoRef.current?.duration || 1)) * 100}%`,
  };

  const handleMuteClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <li className="flex gap-[10px]" onClick={() => setIsModalOpen(true)}>
          <ListIcon /> Thêm vào danh sách phát
        </li>
      ),
      key: "0",
    },
  ];

  return (
    <div>
      <div
        className="rounded-[10px] min-h-[100px] w-full cursor-pointer"
        {...(!isYouTubeUrl(item?.videoUrl) && {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        })}
      >
        <Link href={`/video/${item?._id}`}>
          {item.videoThumbnail && (
            <Image
              src={item.videoThumbnail || ".././../../public/no-image.png"}
              width={500}
              height={200}
              alt={item.title}
              className={`w-full h-[100%] object-cover rounded-[10px] ${
                isHovered ? "hidden" : "block"
              }`}
              role="img"
              aria-labelledby="thumbnail-title"
              priority={false}
              loading="lazy"
            />
          )}
        </Link>
        <div className="relative sm:hidden md:block">
          <Link href={`/video/${item?._id}`}>
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              preload="metadata"
              muted={isMuted}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              className={` top-0 h-[100%] video-hidden-on-sm bg-black  w-[full] left-0 ${
                isHovered ? "block" : "hidden"
              }`}
            >
              <source src={item?.videoUrl} type="video/mp4" />
            </video>
          </Link>

          {isHovered && (
            <>
              <button
                onClick={handleMuteClick}
                className="absolute top-2 right-2 p-1 bg-black text-white rounded-full"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <AudioIcon /> : <Audio2Icon />}
              </button>
              {duration && (
                <span className="absolute bottom-3 right-2 bg-black text-white text-sm p-1 rounded">
                  {formattedTime}
                </span>
              )}
              <div
                ref={progressRef}
                className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div className="h-full bg-slate-500" style={progressBarStyle} />
                <div
                  ref={progressThumbRef}
                  className="absolute h-2 w-2   bg-red-500 rounded-full"
                  style={{
                    left: `${
                      (currentTime / (videoRef.current?.duration || 1)) * 100
                    }%`,
                    transform: "translateX(-50%)",
                    top: "-50%",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-[2px] md:mt-1 ">
        <div className="w-[32px] h-[32px] mt-[12px] mr-[8px] rounded-[50%] overflow-hidden cursor-pointer">
          <Link href={`/channel/${item?.writer?._id}/playlist`}>
            <Image
              src={item.writer.avatar || ""}
              width={32}
              height={32}
              alt="Avatar của người dùng"
              className="w-[100%] h-[100%] rounded-full object-cover"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="flex-1 pr-[20px]">
          <Link href={`/video/${item?._id}`}>
            <h3
              id="thumbnail-title"
              className="md:mt-[5px]  sm:mt-[8px] text-[15px] mb-[4px] text-[#0f0f0f] font-semibold cursor-pointer text-line-camp-2"
            >
              {item.title}
            </h3>
          </Link>
          <Link href={`/channel/${item?.writer?._id}/playlist`}>
            <span className="text-[#606060] text-[14px] font-[500] cursor-pointer flex items-center gap-[3px]">
              {item.writer.name} <CheckIcon />
            </span>
          </Link>
          <div className="flex gap-[5px] text-[14px] text-[#606060] font-medium">
            <span>{item.totalView} lượt xem</span>
            <span>•</span>
            <span>{calculateCreatedTime(item.createdAt)}</span>
          </div>
        </div>

        <div className="mt-[12px] mr-[-15px]">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <TooltipButton Icon={<Option2Icon />} title="" />
          </Dropdown>
        </div>
      </div>

      <ModalSave
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videoId={item._id}
      />
    </div>
  );
};

export default VideoCard;
