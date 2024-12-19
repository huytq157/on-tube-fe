"use client";

import LikeIcon from "@/components/icons/Like";
import DisLikeIcon from "@/components/icons/DisLike";
import SaveIcon from "@/components/icons/Save";
import { useState } from "react";
import ModalSave from "./ModalSave";
import { message } from "antd";
import {
  useCheckIsDisLikedQuery,
  useCheckIsLikedQuery,
  useDislikeVideoMutation,
  useGetVideoByIdQuery,
  useLikeVideoMutation,
} from "@/redux/api/videoApi";
import { useUser } from "@/hook/AuthContext";
import Image from "next/image";
import { IsDisLikeIcons, IsLikeIcons } from "../../../public";
import ShareIcon from "../icons/Share";
import ModalShare from "./ModalShare";
import { useCreateNotificationMutation } from "@/redux/api/notificationApi";

interface ModalProps {
  videoId: string | any;
}

const VideoAction: React.FC<ModalProps> = ({ videoId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalShareOpen, setIsModalShareOpen] = useState(false);
  const { data: video, refetch } = useGetVideoByIdQuery(videoId, {
    refetchOnMountOrArgChange: true,
    skip: !videoId,
  });

  console.log("video Action:", video);

  const { user, isAuthenticated } = useUser();

  const [createNotification] = useCreateNotificationMutation();

  const { data: checkedLike, refetch: refetchLike } = useCheckIsLikedQuery(
    video?.data?._id,
    {
      skip: !videoId,
    }
  );

  const { data: checkedDisLike, refetch: refetchDisLike } =
    useCheckIsDisLikedQuery(video?.data?._id, {
      skip: !videoId,
    });

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
      if (!checkedLike?.isLiked) {
        await likeVideo({ videoId }).unwrap();

        if (checkedDisLike?.isDisliked) {
          await refetchDisLike();
        }

        if (video?.video?.writer?._id !== user?.data?._id) {
          await createNotification({
            video: videoId,
            message: "đã thích video của bạn",
            url: `/video/${videoId}`,
            user: [video?.video?.writer?._id], // người nhận thông báo
            from_user: user?.data?._id, // người gửi thông báo
          }).unwrap();
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
        <div className="flex flex-nowrap w-[150px] justify-center items-center h-[100%] py-[5px] px-[10px]">
          <button
            type="button"
            className="flex flex-1 justify-center items-center gap-[5px] h-[100%]"
            onClick={handleLikeClick}
          >
            {checkedLike?.isLiked ? (
              <Image
                src={IsLikeIcons}
                width={20}
                height={20}
                alt="like"
                className="w-[18px] h-[18px]"
                loading="lazy"
              />
            ) : (
              <LikeIcon />
            )}
            <strong>{video?.data?.likeCount ?? 0}</strong>
          </button>
          <div className="w-[20px] border-[1px] rotate-[-90deg] mx-[10px] border-[#B2B2B2]"></div>
          <button
            type="button"
            className="flex flex-1 justify-center items-center gap-[5px]"
            onClick={handleDislikeClick}
          >
            {checkedDisLike?.isDisliked ? (
              <Image
                src={IsDisLikeIcons}
                width={20}
                height={20}
                alt="dislike"
                className="w-[18px] h-[18px]"
                loading="lazy"
              />
            ) : (
              <DisLikeIcon />
            )}
            <strong>{video?.data?.dislikeCount ?? 0}</strong>
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsModalShareOpen(true)}
        type="button"
        className="bg-[#f2f2f2] min-w-[120px]  flex flex-nowrap justify-center items-center gap-[8px] px-[10px] rounded-[50px]"
      >
        <ShareIcon />{" "}
        <span className="font-semibold font-roboto text-nowrap">Chia sẻ</span>
      </button>
      <button
        type="button"
        className="bg-[#f2f2f2] flex flex-nowrap items-center gap-[10px] px-[10px] rounded-[50px] font-roboto"
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

      <ModalShare
        open={isModalShareOpen}
        setIsModalOpen={setIsModalShareOpen}
        videoId={videoId}
      />
    </div>
  );
};

export default VideoAction;
