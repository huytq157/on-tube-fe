"use client";

import LikeIcon from "@/components/icons/Like";
import DisLikeIcon from "@/components/icons/DisLike";
import SaveIcon from "@/components/icons/Save";
import { useState } from "react";
import ModalSave from "./ModalSave";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import { message } from "antd";
import {
  useCheckIsDisLikedQuery,
  useCheckIsLikedQuery,
  useDislikeVideoMutation,
  useLikeVideoMutation,
} from "@/redux/api/videoApi";
import IsLikeIcon from "../icons/isLike";
import IsDisLikeIcon from "../icons/isDisLike";

interface ModalProps {
  videoId: string | any;
  video: any;
}

const VideoAction: React.FC<ModalProps> = ({ videoId, video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector(selectCurrentToken);
  const [likeCount, setLikeCount] = useState(video?.video?.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(
    video?.video?.dislikeCount || 0
  );
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const { data: checkedLike, refetch: refetchLike } =
    useCheckIsLikedQuery(videoId);
  const { data: checkedDisLike, refetch: refetchDisLike } =
    useCheckIsDisLikedQuery(videoId);

  const [likeVideo] = useLikeVideoMutation();
  const [dislikeVideo] = useDislikeVideoMutation();

  const handleSaveClick = () => {
    if (!user) {
      message.warning("Bạn phải đăng nhập để lưu video!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleLikeClick = async () => {
    if (!user) {
      message.warning("Bạn phải đăng nhập để thích video!");
      return;
    }
    try {
      if (checkedLike?.isLiked === false || checkedLike === undefined) {
        await likeVideo({ videoId }).unwrap();
        setLikeCount(likeCount + 1);

        if (checkedDisLike?.isDisliked === true) {
          setDislikeCount(dislikeCount - 1);
        }
      } else {
        await likeVideo({ videoId }).unwrap();
        setLikeCount(likeCount - 1);
      }
      await refetchLike();
      await refetchDisLike();
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const handleDislikeClick = async () => {
    if (!user) {
      message.warning("Lỗi");
      return;
    }
    try {
      if (
        checkedDisLike?.isDisliked === false ||
        checkedDisLike === undefined
      ) {
        await dislikeVideo({ videoId }).unwrap();
        setDislikeCount(dislikeCount + 1);

        if (checkedLike?.isLiked === true) {
          setLikeCount(likeCount - 1);
        }
      } else {
        await dislikeVideo({ videoId }).unwrap();
        setDislikeCount(dislikeCount - 1);
      }
      await refetchDisLike();
      await refetchLike();
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
            {checkedLike?.isLiked === true ? <IsLikeIcon /> : <LikeIcon />}
            <strong>{likeCount}</strong>
          </button>
          <div className="w-[20px] border-[1px] rotate-[-90deg] mx-[10px] border-[#B2B2B2]"></div>
          <button
            className="flex items-center gap-[5px]"
            onClick={handleDislikeClick}
          >
            {checkedDisLike?.isDisliked === true ? (
              <IsDisLikeIcon />
            ) : (
              <DisLikeIcon />
            )}
            <strong>{dislikeCount}</strong>
          </button>
        </div>
      </div>
      <button className="bg-[#f2f2f2]  flex flex-nowrap items-center gap-[8px] px-[10px] rounded-[50px]">
        <LikeIcon />{" "}
        <span className="font-semibold font-roboto text-nowrap">Chia sẻ</span>
      </button>
      <button
        className="bg-[#f2f2f2] font-semibold flex flex-nowrap items-center gap-[10px] px-[10px] rounded-[50px] font-roboto"
        onClick={handleSaveClick}
      >
        <SaveIcon />{" "}
        <span className="font-semibold font-roboto text-nowrap">Lưu</span>
      </button>

      <ModalSave
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videoId={videoId}
      />
    </div>
  );
};

export default VideoAction;
