"use client";

import { Dropdown, MenuProps } from "antd";
import CommentItem from "../card/CommentItem";
import SortIcon from "@/components/icons/Sort";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Image from "next/image";
import SmellIcon from "../icons/Smell";
import Link from "next/link";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "@/redux/api/commentApi";
import { useCreateNotificationMutation } from "@/redux/api/notificationApi";

interface CommentsProps {
  videoId: string | any;
  video: any;
}

const items: MenuProps["items"] = [
  {
    label: <li className="flex gap-[10px]">Bình luận hàng đầu</li>,
    key: "0",
  },
  {
    label: <li className="flex gap-[10px]">Mới nhất xếp trước</li>,
    key: "1",
  },
];

const Comments: React.FC<CommentsProps> = ({ videoId, video }) => {
  console.log("video comment: ", video);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, { skip: !token });

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

        await createNotification({
          comment: commentResponse?._id,
          video: videoId,
          message: "đã bình luận video của bạn",
          url: `/video/${videoId}`,
          user: [video?.video?.writer?._id],
        }).unwrap();

        setInputValue("");
      } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-[25px] mb-[24px]">
        <span className="text-[20px] font-semibold">
          {comments?.totalComments} bình luận
        </span>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button className="flex font-[500] gap-[5px]">
            <SortIcon /> Sắp xếp theo
          </button>
        </Dropdown>
      </div>

      <div>
        {user?.user ? (
          <div className="flex justify-start mb-[30px]">
            <div className="w-[40px] h-[40px] mr-[12px] rounded-[50%] overflow-hidden cursor-pointer">
              <Image
                src={user?.user?.avatar}
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
                  onFocus={() => setIsInputFocused(true)}
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
      <div className="comment-list">
        {isLoading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p>Error loading comments.</p>
        ) : (
          comments?.data?.map((comment: any) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
