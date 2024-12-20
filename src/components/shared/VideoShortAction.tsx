import LikeIcon from "../icons/Like";
import DisLikeIcon from "../icons/DisLike";
import ShareIcon from "../icons/Share";
import SaveIcon from "../icons/Save";
import { useState } from "react";
import {
  useCheckIsDisLikedQuery,
  useCheckIsLikedQuery,
  useDislikeVideoMutation,
  useLikeVideoMutation,
} from "@/redux/api/videoApi";
import { useUser } from "@/hook/AuthContext";
import { useCreateNotificationMutation } from "@/redux/api/notificationApi";
import { message } from "antd";
import ModalSave from "./ModalSave";
import ModalShare from "./ModalShare";
import CommentIcon from "../icons/Comment";
import ModalComment from "./ModalComment";
import Image from "next/image";
import { IsDisLikeIcons, IsLikeIcons } from "../../../public";

interface ModalProps {
  item: string | any;
}

const VideoShortAction: React.FC<ModalProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalShareOpen, setIsModalShareOpen] = useState(false);
  const [isModalComment, setModalComment] = useState(false);
  const { user, isAuthenticated } = useUser();
  const [createNotification] = useCreateNotificationMutation();
  const videoId = item?._id || 1;
  const { data: checkedLike, refetch: refetchLike } = useCheckIsLikedQuery(
    item?._id,
    {
      skip: !item || !isAuthenticated,
    }
  );

  const { data: checkedDisLike, refetch: refetchDisLike } =
    useCheckIsDisLikedQuery(item?._id, {
      skip: !item || !isAuthenticated,
    });

  const [likeVideo] = useLikeVideoMutation();
  const [dislikeVideo] = useDislikeVideoMutation();

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      message.warning("Bạn phải đăng nhập để thích video!");
      return;
    }
    try {
      if (!checkedLike?.isLiked) {
        await likeVideo({ videoId }).unwrap();

        if (checkedDisLike?.isDisliked) {
          await refetchDisLike();
        }

        if (item?.writer?._id !== user?.data?._id) {
          await createNotification({
            video: videoId,
            message: "đã thích video của bạn",
            url: `/video/${videoId}`,
            user: [item?.writer?._id], // người nhận thông báo
            from_user: user?.data?._id, // người gửi thông báo
          }).unwrap();
        }
      } else {
        await likeVideo({ videoId }).unwrap();
      }
      refetchLike();
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const handleDislikeClick = async () => {
    if (!isAuthenticated) {
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
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      message.warning("Bạn phải đăng nhập để lưu video!");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div
      className="flex-col gap-[20px] justify-center 
  sm:hidden sm:text-white 
  md:relative md:flex md:right-auto md:bottom-auto md:text-[#000]
  lg:text-[#000]"
    >
      <div className="text-center">
        <button
          type="button"
          className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
          aria-label="like-action"
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
        </button>
        <p></p>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
          aria-label="dislike-action"
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
        </button>
        <p></p>
      </div>
      <div className="text-center">
        <button
          onClick={() => setModalComment(true)}
          type="button"
          className="p-1 bg-[#eee] w-[45px] h-[45px] text-white rounded-full flex justify-center items-center"
          aria-label="share-action"
        >
          <CommentIcon />
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={() => setIsModalShareOpen(true)}
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
          onClick={handleSaveClick}
        >
          <SaveIcon />
        </button>
      </div>

      <ModalSave
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videoId={item?._id}
      />

      <ModalComment
        open={isModalComment}
        setIsModalOpen={setModalComment}
        videoId={item?._id}
        video={item}
      />

      <ModalShare
        open={isModalShareOpen}
        setIsModalOpen={setIsModalShareOpen}
        videoId={item?._id}
      />
    </div>
  );
};

export default VideoShortAction;
