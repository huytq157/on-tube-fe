"use client";

import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "../icons/Play";
import PauseIcon from "../icons/Pause";
import AudioIcon from "../icons/Audio";
import Audio2Icon from "../icons/Audio2";
import Link from "next/link";

import { VideoCards } from "../types";
import Image from "next/image";
import { useUser } from "@/hook/AuthContext";
import { useSubscription } from "@/hook/useSubscription";
import VideoShortAction from "../shared/VideoShortAction";

const VideoShortCard: React.FC<VideoCards> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const { user } = useUser();
  const channelId = item?.writer?._id;

  const { currentSubscriptionStatus, handleSubscriptionToggle, isProcessing } =
    useSubscription(channelId, user);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current
          .play()
          .catch((err) => console.error("Error while playing video:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="flex gap-[10px]  relative lg:w-[35%] md:w-[70%]  sm:w-[100%] h-[88vh]">
      <div className="w-full cursor-pointer rounded-[10px] h-full relative group overflow-hidden">
        <div className="flex gap-[15px] absolute p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            className="p-1 w-[45px] h-[45px] text-white rounded-full flex justify-center items-center bg-black/40"
            aria-label="play-pause"
            onClick={togglePlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            type="button"
            className="p-1 bg-opacity-50 w-[45px] h-[45px] text-white rounded-full flex justify-center items-center bg-black/40"
            aria-label="audio"
            onClick={toggleMute}
          >
            {isMuted ? <AudioIcon /> : <Audio2Icon />}
          </button>
        </div>

        <div className="absolute bottom-6 left-3 text-[#fff] font-bold z-10">
          <div className="flex gap-[10px] items-center">
            <Link href={`/channel/${item?.writer?._id}/playlist`}>
              <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                <Image
                  src={item?.writer?.avatar || ""}
                  width={40}
                  height={40}
                  alt={`Avatar của ${item?.writer?.name || "người dùng"}`}
                  className="w-[100%] h-[100%]"
                  loading="lazy"
                />
              </div>
            </Link>
            <span>{item?.writer?.name}</span>
            {user?.data?._id !== item?.writer?._id && (
              <button
                type="button"
                className="rounded-[50px] px-3 min-w-[90px] bg-white text-[#000] h-[36px] font-roboto"
                onClick={handleSubscriptionToggle}
                disabled={isProcessing}
              >
                {currentSubscriptionStatus ? "Đã đăng ký" : "Đăng ký"}
              </button>
            )}
          </div>
          <p className="mt-3">{item?.title}</p>
        </div>

        <video
          ref={videoRef}
          width="100%"
          height="auto"
          preload="metadata"
          autoPlay={true}
          autoFocus={true}
          className="top-0  h-[100%] bg-black w-full left-0"
          src={item?.videoUrl}
          onClick={togglePlay}
          onEnded={handleVideoEnded}
        />
      </div>

      <VideoShortAction item={item} />
    </div>
  );
};

export default VideoShortCard;
