"use client";

import LikeIcon from "@/components/icons/Like";
import DisLikeIcon from "@/components/icons/DisLike";
import SaveIcon from "@/components/icons/Save";
import { useEffect, useState } from "react";
import ModalSave from "./ModalSave";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import { message } from "antd";
import {
  useCheckIsDisLikedQuery,
  useCheckIsLikedQuery,
  useDislikeVideoMutation,
  useGetVideoByIdQuery,
  useLikeVideoMutation,
} from "@/redux/api/videoApi";
import IsLikeIcon from "../icons/isLike";
import IsDisLikeIcon from "../icons/isDisLike";

interface ModalProps {
  videoId: string | any;
}

const VideoAction: React.FC<ModalProps> = ({ videoId }) => {
  const token = useSelector(selectCurrentToken);
  const { data: video, refetch } = useGetVideoByIdQuery(videoId, {
    refetchOnMountOrArgChange: true,
  });

  const { data: user } = useGetMeQuery(undefined, { skip: !token });
  const { data: checkedLike, refetch: refetchLike } =
    useCheckIsLikedQuery(videoId);
  const { data: checkedDisLike, refetch: refetchDisLike } =
    useCheckIsDisLikedQuery(videoId);

  const [likeVideo] = useLikeVideoMutation();
  const [dislikeVideo] = useDislikeVideoMutation();

  const handleLikeClick = async () => {
    if (!user) {
      message.warning("Bạn phải đăng nhập để thích video!");
      return;
    }
    try {
      if (!checkedLike?.isLiked) {
        await likeVideo({ videoId }).unwrap();
        if (checkedDisLike?.isDisliked) {
          await refetchDisLike();
        }
      } else {
        await likeVideo({ videoId }).unwrap();
      }
      refetchLike();
      refetch();
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const handleDislikeClick = async () => {
    if (!user) {
      message.warning("Bạn phải đăng nhập để không thích video!");
      return;
    }
    try {
      if (!checkedDisLike?.isDisliked) {
        await dislikeVideo({ videoId }).unwrap();
        if (checkedLike?.isLiked) {
          await refetchLike();
        }
      } else {
        await dislikeVideo({ videoId }).unwrap();
      }
      refetchDisLike();
      refetch();
    } catch (error) {
      message.error("Lỗi");
    }
  };

  return (
    <div className="flex gap-[10px] overflow-y-auto">
      <div className="bg-[#f2f2f2] rounded-[50px]">
        <div className="flex flex-nowrap items-center h-[100%] py-[5px] px-[10px]">
          <button
            className="flex items-center gap-[5px] h-[100%]"
            onClick={handleLikeClick}
          >
            {checkedLike?.isLiked ? <IsLikeIcon /> : <LikeIcon />}
            <strong>{video?.video?.likeCount ?? 0}</strong>
          </button>
          <div className="w-[20px] border-[1px] rotate-[-90deg] mx-[10px] border-[#B2B2B2]"></div>
          <button
            className="flex items-center gap-[5px]"
            onClick={handleDislikeClick}
          >
            {checkedDisLike?.isDisliked ? <IsDisLikeIcon /> : <DisLikeIcon />}
            <strong>{video?.video?.dislikeCount ?? 0}</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoAction;
