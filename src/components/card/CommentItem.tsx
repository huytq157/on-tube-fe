"use client";

import Image from "next/image";
import TooltipButton from "../shared/TooltipButton";
import LikeIcon from "../icons/Like";
import DisLikeIcon from "../icons/DisLike";
import { Dropdown, MenuProps } from "antd";
import Option2Icon from "../icons/Option2";
import { calculateCreatedTime } from "../utils/formatDate";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import React, { useState } from "react";
import Link from "next/link";

interface User {
  _id: string;
  avatar: string;
  name: string;
}

interface Reply {
  _id: string;
  comment: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  replies?: Reply[];
}

interface CommentItemProps {
  comment: {
    _id: string;
    createdAt: Date;
    comment: string;
    user: User;
    replies: Reply[];
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, { skip: !token });
  const [showReplies, setShowReplies] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: <li className="flex gap-[10px]">Sửa</li>,
      key: "0",
    },
    {
      label: <li className="flex gap-[10px]">Xóa</li>,
      key: "1",
    },
  ];

  const countReplies = (replies: any) => {
    let count = replies.length;
    replies.forEach((reply: any) => {
      count += countReplies(reply.replies);
    });
    return count;
  };

  const totalReplies = countReplies(comment.replies);

  // Hiển thị phản hồi
  const renderReplies = (replies: Reply[], parentName: string) => {
    return replies.map((reply) => (
      <div key={reply._id} className="mb-3">
        <div className="flex justify-start">
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
              <span className="text-[#000] bg-[#ccc] px-[5px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[3px]">
                {reply.user.name}
              </span>
              <span>{calculateCreatedTime(reply.createdAt)}</span>
            </div>
            <div className="py-[5px]">
              <p>
                <Link href="/">
                  <span className="font-[500] mr-2">{parentName}:</span>
                </Link>
                {reply.comment}
              </p>
            </div>
            <div className="ml-[-10px] flex items-center">
              <TooltipButton title="Thích" Icon={<LikeIcon />} />
              <TooltipButton title="Không thích" Icon={<DisLikeIcon />} />
              <button className="font-semibold ml-4">Phản hồi</button>
            </div>
          </div>
        </div>
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
          className="w-[100%] h-[100%]"
        />
      </div>
      <div className="flex-1 mb-3">
        <div className="flex gap-[7px]">
          <span className="text-[#000] bg-[#ccc] px-[5px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[3px]">
            {comment.user.name}
          </span>
          <span>{calculateCreatedTime(comment.createdAt)}</span>
        </div>
        <div className="py-[5px]">
          <p>{comment.comment}</p>
        </div>
        <div className="ml-[-10px] flex items-center">
          <TooltipButton title="Thích" Icon={<LikeIcon />} />
          <TooltipButton title="Không thích" Icon={<DisLikeIcon />} />
          <button className="font-semibold ml-4">Phản hồi</button>
        </div>
        {comment.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-blue-500 font-[500] mb-2"
          >
            {showReplies ? "Ẩn phản hồi" : `Xem phản hồi(${totalReplies})`}
          </button>
        )}

        {showReplies && (
          <div className="mt-2">
            {renderReplies(comment.replies, comment.user.name)}
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
