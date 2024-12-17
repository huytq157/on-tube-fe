"use client";

import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "../icons/Play";
import PauseIcon from "../icons/Pause";
import AudioIcon from "../icons/Audio";
import Audio2Icon from "../icons/Audio2";
import Link from "next/link";
import LikeIcon from "../icons/Like";
import DisLikeIcon from "../icons/DisLike";
import ShareIcon from "../icons/Share";
import SaveIcon from "../icons/Save";
import { VideoCards } from "../types";
import Image from "next/image";

const VideoShortCard: React.FC<VideoCards> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

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
    <div className="flex gap-[10px] relative lg:w-[30%] sm:w-[100%] h-[85vh]">
      <div className=" cursor-pointer rounded-[10px] h-full relative group overflow-hidden">
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
          <Link href="/">
            <div className="flex gap-[10px] items-center">
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
              <span>{item?.writer?.name}</span>
              <button
                type="button"
                className="rounded-[50px] px-3 min-w-[90px] bg-white text-[#000] h-[36px] font-roboto"
              >
                Đăng ký
              </button>
            </div>
          </Link>
          <p className="mt-3">{item?.title}</p>
        </div>

        <video
          ref={videoRef}
          width="100%"
          height="auto"
          preload="metadata"
          autoPlay={true}
          autoFocus={true}
          className="top-0 h-full video-hidden-on-sm bg-black w-full left-0"
          src={item?.videoUrl}
          onClick={togglePlay}
          onEnded={handleVideoEnded}
        />
      </div>

      <div
        className="flex flex-col gap-[20px] justify-center 
  sm:absolute sm:right-3 sm:bottom-6 sm:text-white 
  md:relative md:right-auto md:bottom-auto md:text-[#000]
  lg:text-[#000]"
      >
        <div className="text-center">
          <button
            type="button"
            className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
            aria-label="like-action"
          >
            <LikeIcon />
          </button>
          <p>12N</p>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
            aria-label="dislike-action"
          >
            <DisLikeIcon />
          </button>
          <p>12N</p>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
            aria-label="share-action"
          >
            <ShareIcon />
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
            aria-label="save-action"
          >
            <SaveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoShortCard;
