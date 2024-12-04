"use client";

import Image from "next/image";
import TooltipButton from "../shared/TooltipButton";
import LikeIcon from "../icons/Like";
import DisLikeIcon from "../icons/DisLike";
import { Dropdown, MenuProps } from "antd";
import Option2Icon from "../icons/Option2";
import { calculateCreatedTime } from "../utils/formatDate";
import React, { useState } from "react";
import Link from "next/link";
import {
  useDeleteCommentMutation,
  useReplyCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/api/commentApi";

import EmojiPicker from "emoji-picker-react";
import SmellIcon from "../icons/Smell";
import { useCreateNotificationMutation } from "@/redux/api/notificationApi";
import { useUser } from "@/hook/AuthContext";
import { CommentItems, Reply } from "../types";

const CommentItem: React.FC<CommentItems> = ({ comment }) => {
  const { user } = useUser();

  const [showReplies, setShowReplies] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState<string>("");

  const [replyComment] = useReplyCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [createNotification] = useCreateNotificationMutation();

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      await deleteComment(replyId).unwrap();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const countReplies = (replies: any) => {
    let count = replies.length;
    replies.forEach((reply: any) => {
      count += countReplies(reply.replies);
    });
    return count;
  };

  const totalReplies = countReplies(comment.replies);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const replyresponse = await replyComment({
        comment: replyText,
        parent_id: replyingToId,
      }).unwrap();

      if (comment?.user?._id === user?.user?._id) return;

      await createNotification({
        comment: replyresponse?._id,
        video: replyresponse?.reply?.video,
        message: "trả lời bình luận của bạn",
        url: `/video/${replyresponse?.reply?.video}`,
        user: comment?.user?._id,
      }).unwrap();

      setReplyText("");
      setReplyingToId(null);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleEmojiClick = (emoji: any) => {
    setReplyText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiEdit = (emoji: any) => {
    setEditingCommentText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleCancel = () => {
    setReplyingToId(null);
    setReplyText("");
  };

  const handleEditComment = (commentId: string, commentText: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(commentText);
    setIsEditing(true);
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateComment({
        commentId: editingCommentId,
        comment: { comment: editingCommentText },
      }).unwrap();
      setEditingCommentId(null);
      setEditingCommentText("");
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật bình luận:", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <li
          className="flex gap-[10px]"
          onClick={() => handleEditComment(comment._id, comment.comment)}
        >
          Sửa
        </li>
      ),
      key: "0",
    },
    {
      label: (
        <li
          className="flex gap-[10px]"
          onClick={() => handleDeleteComment(comment._id)}
        >
          Xóa
        </li>
      ),
      key: "1",
    },
  ];

  // Hiển thị phản hồi comment
  const renderReplies = (replies: Reply[], parentName: string) => {
    return replies.map((reply) => (
      <div key={reply._id} className="mb-3">
        <div className="flex justify-between">
          <div className=" flex flex-1">
            <div className="w-[35px] h-[35px] mr-[8px] rounded-[50%] overflow-hidden cursor-pointer">
              <Image
                src={reply.user.avatar}
                width={35}
                height={35}
                alt=""
                className="w-[100%] h-[100%]"
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-[7px]">
                <span className="text-[#000] bg-[#eee] text-nowrap h-[20px] px-[5px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[3px]">
                  {reply.user.name}
                </span>
                <span className="text-nowrap">
                  {calculateCreatedTime(reply.createdAt)}
                </span>
              </div>
              <div className="py-[5px]">
                {isEditing && editingCommentId === reply._id ? (
                  <form
                    onSubmit={handleUpdateComment}
                    className="mt-2 w-[100%]"
                  >
                    <input
                      placeholder="."
                      type="text"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="w-[100%] outline-none border-b-[1px] border-[#504e4e] pb-1"
                    />
                    <div className="flex gap-[20px] justify-between mt-3">
                      <div className="relative">
                        <div
                          className="cursor-pointer"
                          onClick={() => setShowEmojiPicker((prev) => !prev)}
                        >
                          <SmellIcon />
                        </div>
                        {showEmojiPicker && (
                          <div className="absolute top-[100%] z-[100] left-0">
                            <EmojiPicker onEmojiClick={handleEmojiEdit} />
                          </div>
                        )}
                      </div>
                      <div>
                        <button
                          type="submit"
                          className=" rounded-[50px] min-w-[90px] h-[36px] bg-[#333] text-[#fff]"
                        >
                          Cập nhật
                        </button>
                        <button
                          type="button"
                          className="bg-transparent min-w-[90px] h-[36px] rounded-[50px] hover:bg-[#f2f2f2] mr-2"
                          onClick={() => setIsEditing(false)}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <p>
                    <Link href="/">
                      <span className="font-[400] mr-2">{parentName}:</span>
                    </Link>
                    {reply.comment}
                  </p>
                )}
              </div>
              <div className="ml-[-10px] flex items-center">
                <TooltipButton title="Thích" Icon={<LikeIcon />} />
                <TooltipButton title="Không thích" Icon={<DisLikeIcon />} />
                <button
                  type="button"
                  className="font-semibold ml-4"
                  onClick={() => setReplyingToId(reply._id)}
                >
                  Phản hồi
                </button>
              </div>
            </div>
          </div>
          <div className="">
            {user && user.user?._id === reply.user._id && (
              <div className="mt-[12px]">
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: (
                          <button
                            type="button"
                            className="flex gap-[10px]"
                            onClick={() => handleDeleteReply(reply._id)}
                          >
                            Xóa
                          </button>
                        ),
                        key: "1",
                      },
                      {
                        label: (
                          <button
                            type="button"
                            className="flex gap-[10px]"
                            onClick={() =>
                              handleEditComment(reply._id, reply.comment)
                            }
                          >
                            Sửa
                          </button>
                        ),
                        key: "3",
                      },
                    ],
                  }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <TooltipButton Icon={<Option2Icon />} />
                </Dropdown>
              </div>
            )}
          </div>
        </div>

        {/* Form phản hồi lồng vào nhau */}
        {replyingToId === reply._id && (
          <form onSubmit={handleReplySubmit} className="mt-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Viết bình luận ..."
              className="w-[100%] outline-none border-b-[1px] border-[#504e4e] pb-1"
            />
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
                    replyText
                      ? "bg-[#333] text-[#fff]"
                      : "bg-[#ccc] text-[#fff]"
                  }`}
                >
                  Bình luận
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Hiển thị phản hồi lồng vao nhau */}
        <div className="mt-4">
          {reply.replies && reply.replies.length > 0 && (
            <div>{renderReplies(reply.replies, reply.user.name)}</div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-start">
      <div className="w-[40px] h-[40px] mr-[12px] rounded-[50%] overflow-hidden cursor-pointer">
        <Image
          src={comment.user.avatar}
          width={40}
          height={40}
          alt=""
          className="w-[40px] h-[40px]"
        />
      </div>

      <div className="flex-1 mb-3">
        <div className="flex gap-[7px]">
          <span className="text-[#000] bg-[#eee] text-nowrap h-[20px] px-[5px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[3px]">
            {comment.user.name}
          </span>
          <span className="text-nowrap">
            {calculateCreatedTime(comment.createdAt)}
          </span>
        </div>
        <div className="py-[5px]">
          {isEditing && editingCommentId === comment._id ? (
            <form onSubmit={handleUpdateComment} className="mt-2">
              <input
                type="text"
                placeholder="."
                value={editingCommentText}
                onChange={(e) => setEditingCommentText(e.target.value)}
                className="w-[100%] outline-none border-b-[1px] border-[#504e4e] pb-1"
              />
              <div className="flex gap-[20px] justify-between mt-1">
                <div className="relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    <SmellIcon />
                  </div>
                  {showEmojiPicker && (
                    <div className="absolute top-[100%] z-[100] left-0">
                      <EmojiPicker onEmojiClick={handleEmojiEdit} />
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-[10px] rounded-[50px] min-w-[90px] h-[36px]
                     bg-[#333] text-[#fff]"
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="bg-transparent min-w-[90px] h-[36px] rounded-[50px] hover:bg-[#f2f2f2] mr-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p>{comment.comment}</p>
          )}
        </div>
        <div className="ml-[-10px] flex items-center">
          <TooltipButton title="Thích" Icon={<LikeIcon />} />
          <TooltipButton title="Không thích" Icon={<DisLikeIcon />} />
          <button
            type="button"
            className="font-semibold ml-3"
            onClick={() => setReplyingToId(comment._id)}
          >
            Phản hồi
          </button>
        </div>

        {/* Form phản hồi cho bình luận chính */}
        {replyingToId === comment._id && (
          <form onSubmit={handleReplySubmit} className="mt-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Viết bình luận ..."
              className="w-[100%] outline-none border-b-[1px] border-[#504e4e] pb-1"
            />
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
                    replyText
                      ? "bg-[#333] text-[#fff]"
                      : "bg-[#ccc] text-[#fff]"
                  }`}
                >
                  Bình luận
                </button>
              </div>
            </div>
          </form>
        )}

        {comment.replies.length > 0 && (
          <button
            type="button"
            onClick={() => setShowReplies(!showReplies)}
            className="text-blue-500 font-[500] mb-2"
          >
            {showReplies ? "Ẩn phản hồi" : `Xem phản hồi(${totalReplies})`}
          </button>
        )}

        {/* Hiển thị danh sách phản hồi */}
        {showReplies && (
          <div className="mt-4">
            {comment.replies.length > 0 && (
              <div>{renderReplies(comment.replies, comment.user.name)}</div>
            )}
          </div>
        )}
      </div>

      {user && user.user?._id === comment.user._id && (
        <div className="mt-[12px]">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <TooltipButton Icon={<Option2Icon />} />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
