"use client";

import Image from "next/image";
import Link from "next/link";
import CheckIcon from "../icons/Check";
import { Dropdown, MenuProps } from "antd";
import TooltipButton from "../shared/TooltipButton";
import ListIcon from "../icons/List";
import Option2Icon from "../icons/Option2";
import { calculateCreatedTime } from "../utils/formatDate";
import { useEffect, useState } from "react";
import ModalSave from "../shared/ModalSave";

const VideoItem: React.FC<any> = ({ video }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (video?.videoThumbnail) {
      setImageSrc(video?.videoThumbnail);
    }
  }, [video?.videoThumbnail]);

  const items: MenuProps["items"] = [
    {
      label: (
        <li className="flex gap-[10px]" onClick={() => setIsModalOpen(true)}>
          <ListIcon /> Thêm vào danh sách phát
        </li>
      ),
      key: "0",
    },
  ];

  return (
    <div className="flex sm:flex-col md:flex-row gap-[10px] h-[100%]">
      <div className="rounded-[10px]  md:w-[168px] sm:w-full md:h-[100px] sm:h-auto   overflow-hidden bg-[#ccc]  cursor-pointer">
        <Link href={`/video/${video?._id}`}>
          {imageSrc && (
            <Image
              src={imageSrc}
              width={168}
              height={100}
              alt={video?.title}
              loading="lazy"
              className="w-[100%] h-[100%] object-fill"
            />
          )}
        </Link>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1">
          <Link href={`/video/${video?._id}`}>
            <h3 className="font-roboto text-[15px] mb-[7px] text-[#0f0f0f] font-[600] cursor-pointer text-line-camp-2 leading-[21px]">
              {video?.title}
            </h3>
          </Link>
          <Link
            href={`/channel/${video?.writer?._id}/playlist`}
            className="font-roboto "
          >
            <span className="text-[#606060] font-[700] text-[13px] cursor-pointer leading-[21px] flex items-center gap-[3px] ">
              {video?.writer?.name} <CheckIcon />
            </span>
          </Link>
          <div className="flex gap-[5px] text-[#606060] font-medium">
            <span className="text-[12px] font-roboto font-semibold">
              {video?.totalView} lượt xem
            </span>
            <span className="text-[12px] font-roboto">•</span>
            <span className="text-[12px] font-roboto font-semibold">
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
