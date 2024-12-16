"use client";

import React from "react";
import PlayIcon from "../icons/Play";
import AudioIcon from "../icons/Audio";
import Link from "next/link";
import LikeIcon from "../icons/Like";
import DisLikeIcon from "../icons/DisLike";
import ShareIcon from "../icons/Share";
import SaveIcon from "../icons/Save";

const VideoShortCard = () => {
  return (
    <div className="flex gap-[10px]">
      <div className="w-[480px] cursor-pointer bg-slate-100 rounded-[10px] h-[849px] relative group">
        <div className="flex gap-[15px] absolute p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            className="p-1 w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            aria-label="play"
          >
            <PlayIcon />
          </button>
          <button
            type="button"
            className="p-1 bg-opacity-50 w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            aria-label="audio"
          >
            <AudioIcon />
          </button>
        </div>
        <div className="absolute bottom-6 left-3">
          <Link href="/">
            <div className="flex gap-[10px] items-center">
              <span> Huy official</span>
              <button
                type="button"
                className="rounded-[50px] px-3 min-w-[90px] bg-white text-[#000] h-[36px] font-roboto"
              >
                Đăng ký
              </button>
            </div>
          </Link>
          <p>mô tả</p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] justify-center">
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
