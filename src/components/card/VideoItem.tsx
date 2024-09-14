"use client";
import Image from "next/image";
import { Video } from "../../../public";
import Link from "next/link";
import CheckIcon from "../icons/Check";
import { Dropdown, MenuProps } from "antd";
import TooltipButton from "../shared/TooltipButton";
import ListIcon from "../icons/List";
import ClockIcon from "../icons/Clock";
import Option2Icon from "../icons/Option2";

const items: MenuProps["items"] = [
  {
    label: (
      <li className="flex gap-[10px]">
        <ListIcon /> Thêm vào danh sách phát
      </li>
    ),
    key: "0",
  },
  {
    label: (
      <li className="flex gap-[10px]">
        <ClockIcon /> Thêm vào video yêu thích
      </li>
    ),
    key: "1",
  },
];

const VideoItem = () => {
  return (
    <div className="flex gap-[10px] h-[100%]">
      <div className="rounded-[10px] flex-1 h-[100%] overflow-hidden bg-[#ccc] w-full  cursor-pointer">
        <Image
          src={Video}
          width={500}
          height={500}
          alt="Picture of the author"
          className="w-[100%] h-[100%] object-cover"
        />
      </div>

      <div className="flex-1">
        <Link href={"/video/1"}>
          <h3 className=" text-[14px] mb-[4px] text-[#0f0f0f] font-semibold cursor-pointer text-line-camp-2 leading-[22px]">
            Next.js 14 Complete Course 2024 | Next.js 14 Full Stack App Tutorial
            for Beginners
          </h3>
        </Link>
        <Link href="/me">
          <span className="text-[#606060] cursor-pointer flex items-center gap-[3px] leading-[18px]">
            Huy Offical <CheckIcon />
          </span>
        </Link>
        <div className="flex gap-[5px] text-[#606060] font-medium">
          <span>69 lượt xem</span>
          <span>•</span>
          <span>3 tuần trước</span>
        </div>
      </div>

      <div className=" mr-[-15px]">
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <TooltipButton Icon={<Option2Icon />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default VideoItem;
