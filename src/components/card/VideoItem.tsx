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
    <div className="flex sm:flex-col md:flex-row gap-[10px] h-[100%]">
      <div className="rounded-[10px]  md:w-[168px] sm:w-full md:h-[100px] sm:h-auto   overflow-hidden bg-[#ccc]  cursor-pointer">
        <Image
          src={Video}
          width={168}
          height={100}
          alt="Picture of the author"
          className="w-[100%] h-[100%] object-fill"
        />
      </div>

      <div className="flex-1 flex">
        <div>
          <Link href={"/video/1"}>
            <h3 className=" text-[14px] mb-[7px] text-[#0f0f0f] font-[600] cursor-pointer text-line-camp-2 leading-[21px]">
              Nhạc Tết Chill 2024 - Tết Đong Đầy - Nhạc Xuân Chill Nghe Là Thấy
              Tết
            </h3>
          </Link>
          <Link href="/me">
            <span className="text-[#606060] text-[13px] cursor-pointer leading-[21px] flex items-center gap-[3px] ">
              Huy Offical <CheckIcon />
            </span>
          </Link>
          <div className="flex gap-[5px] text-[#606060] font-medium">
            <span className="text-[12px]">69 lượt xem</span>
            <span className="text-[12px]">•</span>
            <span className="text-[12px]">3 tuần trước</span>
          </div>
        </div>

        <div className="mr-[-15px]">
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

export default VideoItem;
