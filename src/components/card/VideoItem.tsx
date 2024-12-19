"use client";

import Image from "next/image";
import Link from "next/link";
import CheckIcon from "../icons/Check";
import { Dropdown, MenuProps } from "antd";
import TooltipButton from "../shared/TooltipButton";
import ListIcon from "../icons/List";
import Option2Icon from "../icons/Option2";
import { calculateCreatedTime } from "../utils/formatDate";
import { useState } from "react";
import ModalSave from "../shared/ModalSave";
import { VideoItemProp } from "../types";

const VideoItem: React.FC<VideoItemProp> = ({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex gap-[10px]" onClick={() => setIsModalOpen(true)}>
          <ListIcon /> Thêm vào danh sách phát
        </div>
      ),
      key: "0",
    },
  ];

  return (
    <div className="flex sm:flex-col md:flex-row gap-[10px] h-[100%]">
      <div className="rounded-[7px] relative  md:w-[168px] sm:w-full md:h-[100px] sm:h-auto   overflow-hidden bg-[#ccc]  cursor-pointer">
        <Link href={`/video/${video?._id}`}>
          <Image
            src={
              video?.videoThumbnail ||
              "https://res.cloudinary.com/dh0peripq/image/upload/v1734422284/h-tube-image/h-tube-image-1734422283323-download.webp"
            }
            width={256}
            height={144}
            alt={video?.title}
            priority
            className="w-[100%] h-[100%] object-cover"
          />
        </Link>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1">
          <Link href={`/video/${video?._id}`}>
            <strong className="font-roboto mb-[7px] text-[#0f0f0f] !text-[14px] cursor-pointer text-line-camp-2 leading-[21px]">
              {video?.title}
            </strong>
          </Link>
          <Link
            href={`/channel/${video?.writer?._id}/playlist`}
            className="font-roboto "
          >
            <span className="text-[#606060] font-medium text-[13px] cursor-pointer leading-[21px] flex items-center gap-[3px] ">
              {video?.writer?.name} <CheckIcon />
            </span>
          </Link>
          <div className="flex gap-[5px] text-[#606060] font-medium">
            <span className="text-[12px] font-roboto font-medium whitespace-nowrap">
              {video?.totalView} lượt xem
            </span>
            <span className="text-[12px] font-roboto">•</span>
            <span className="text-[12px] font-roboto font-medium whitespace-nowrap">
              {calculateCreatedTime(video?.createdAt)}
            </span>
          </div>
        </div>

        <div className="mr-[-15px]">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <TooltipButton Icon={<Option2Icon />} title="" />
          </Dropdown>
        </div>
      </div>

      <ModalSave
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        videoId={video._id}
      />
    </div>
  );
};

export default VideoItem;
