"use client";

import Image from "next/image";
import { Video } from "../../../public";
import CheckIcon from "../icons/Check";
import Option2Icon from "../icons/Option2";
import TooltipButton from "../shared/TooltipButton";
import { Dropdown, MenuProps } from "antd";
import ListIcon from "../icons/List";
import ClockIcon from "../icons/Clock";
import Link from "next/link";

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

const VideoCard = () => {
  return (
    <div>
      <div className="rounded-[10px] overflow-hidden bg-[#ccc] w-full cursor-pointer">
        <Link href={"/video/1"}>
          <Image
            src={Video}
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-[100%] object-cover"
          />
        </Link>
      </div>
      <div className="flex gap-[5px]">
        <div className="w-[36px] h-[36px] mt-[12px] mr-[8px]  rounded-[50%] overflow-hidden cursor-pointer">
          <Image
            src={Video}
            width={36}
            height={36}
            alt=""
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="flex-1 pr-[20[x]">
          <Link href={"/video/1"}>
            <h3 className="mt-[12px] text-[16px] mb-[4px] text-[#0f0f0f] font-semibold cursor-pointer text-line-camp-2">
              Next.js 14 Complete Course 2024 | Next.js 14 Full Stack App
              Tutorial for Beginners
            </h3>
          </Link>
          <span className="text-[#606060] cursor-pointer flex items-center gap-[3px]">
            Huy Offical <CheckIcon />
          </span>
          <div className="flex gap-[5px] text-[#606060] font-medium">
            <span>69 lượt xem</span>
            <span>•</span>
            <span>3 tuần trước</span>
          </div>
        </div>

        <div className="mt-[12px] mr-[-15px]">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <TooltipButton Icon={<Option2Icon />} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
