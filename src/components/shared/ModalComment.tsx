import { Divider, Image, Modal, Skeleton } from "antd";
import { ModalProps } from "../types";
import { useState, ChangeEvent } from "react";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "@/redux/api/commentApi";
import { useCreateNotificationMutation } from "@/redux/api/notificationApi";
import { useUser } from "@/hook/AuthContext";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import SmellIcon from "../icons/Smell";
import CommentItem from "../card/CommentItem";
import Link from "next/link";
import { useSocket } from "@/hook/SocketContext";

const ModalComment: React.FC<ModalProps> = ({
  open,
  setIsModalOpen,
  videoId,
  video,
}) => {
  const handelClose = () => {
    setIsModalOpen(false);
  };

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const { user, isAuthenticated } = useUser();
  const { socket } = useSocket();
  const { data: comments, error, isLoading } = useGetCommentsQuery({ videoId });

  const [addComment] = useAddCommentMutation();
  const [createNotification] = useCreateNotificationMutation();

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputValue((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleCancel = () => {
    setIsInputFocused(false);
    setInputValue("");
    setShowEmojiPicker(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const commentResponse = await addComment({
          comment: inputValue,
          video_id: videoId,
        }).unwrap();

        if (video?.writer?._id === user?.data?._id) return;

        const notification = await createNotification({
          comment: commentResponse?._id,
          video: videoId,
          message: "đã bình luận video của bạn",
          url: `/video/${videoId}`,
          user: [video?.writer?._id],
          from_user: user?.data?._id,
        }).unwrap();

        socket?.emit("create-new-notification", notification);
      } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
      }
    }
  };

  return (
    <div>
      <Modal
        title={`Bình luận ${comments?.totalComments}`}
        open={open}
        onOk={handelClose}
        onCancel={handelClose}
        centered
        footer={null}
        width={480}
      >
        <div>
          <Divider />
          <div className="comment-list py-4">
            {isLoading ? (
              <>
                <Skeleton active paragraph={{ rows: 3 }} />
                <Skeleton active paragraph={{ rows: 3 }} />
                <Skeleton active paragraph={{ rows: 3 }} />
              </>
            ) : error ? (
              <p>Error loading comments.</p>
            ) : (
              comments?.data?.map((comment: any) => (
                <CommentItem key={comment._id} comment={comment} />
              ))
            )}
          </div>
          <Divider />
          {isAuthenticated ? (
            <div className="flex justify-start mb-[10px]">
              <div className="w-[40px] h-[40px] mr-[12px] rounded-[50%] overflow-hidden cursor-pointer">
                <Image
                  src={user?.data?.avatar}
                  width={40}
                  height={40}
                  alt=""
                  className="w-[100%] h-[100%]"
                />
              </div>

              <div className="flex-1">
                <form onSubmit={handleAddComment}>
                  <input
                    placeholder="Viết bình luận ..."
                    className="w-[100%] outline-none border-b-[1px] border-[#504e4e] pb-1"
                    onClick={() => setIsInputFocused(true)}
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e.target.value)
                    }
                  />
                  {isInputFocused && (
                    <div className="flex justify-between mt-[5px] items-center">
                      <div className="relative">
                        <div
                          className="cursor-pointer"
                          onClick={() => setShowEmojiPicker((prev) => !prev)}
                        >
                          <SmellIcon />
                        </div>
                        {showEmojiPicker && (
                          <div className="absolute top-[100%] z-[100] left-0">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                          </div>
                        )}
                      </div>
                      <div>
                        <button
                          className="bg-transparent min-w-[90px] h-[36px] rounded-[50px] hover:bg-[#f2f2f2] mr-2"
                          type="button"
                          onClick={handleCancel}
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className={`mt-[10px] rounded-[50px] min-w-[90px] h-[36px] ${
                            inputValue
                              ? "bg-[#333] text-[#fff]"
                              : "bg-[#ccc] text-[#fff]"
                          }`}
                        >
                          Bình luận
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          ) : (
            <div className="mb-4 font-[500]">
              Bạn phải
              <Link
                href="/login"
                className="font-semibold leading-6 px-2 text-indigo-600 hover:text-indigo-500"
              >
                Đăng nhập
              </Link>
              để có thể bình luận
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalComment;
