"use client";

import Image from "next/image";
import { BgChannel, Channel } from "../../../../public";
import { Tabs, TabsProps } from "antd";
import styled from "styled-components";
import Link from "next/link";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import VideoCard from "@/components/card/VideoCard";
import Playlist from "@/components/shared/Playlist";

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0;
    .ant-tabs-tab {
      font-size: 16px;
      font-weight: 500;
      padding: 10px;
      color: #606060;
      margin: 0 0 0 10px;
      &.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #000;
      }

      &:hover {
        color: #333;
      }

      &::before {
        border: none;
      }
    }

    .ant-tabs-ink-bar {
      background-color: #000;
      height: 3px;
    }
  }

  .ant-tabs-content-holder {
    margin-top: 20px;
    padding: 20px;
    background-color: #ffff;
    border-radius: 8px;
  }
`;

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Trang chủ",
    children: (
      <>
        {" "}
        <Playlist />
      </>
    ),
  },
  {
    key: "2",
    label: "Video",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Danh sách phát",
    children: "Content of Tab Pane 3",
  },
];

const Profile = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <LayoutDefault>
      <div className="px-[30px]">
        <div className="w-[100%] h-[180px] rounded-[12px] overflow-hidden mb-[10px] bg-slate-50">
          <Image
            src={BgChannel}
            width={1070}
            height={170}
            alt="Picture of the author"
            className="w-[100%] h-[170px] object-fill rounded-[12px] "
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <div className="w-[160px] h-[160px] rounded-[50%] overflow-hidden">
            <Image
              src={Channel}
              width={160}
              height={160}
              alt="Picture of the author"
              className="w-[100%] h-[100%] object-fill rounded-[12px] "
            />
          </div>
          <div>
            <h1 className="font-bold text-[30px] leading-[32px]">
              Trần Quang Huy
            </h1>
            <div className="flex gap-[5px] my-[5px] text-[#606060] font-medium">
              <span>@quanghuy157</span>
              <span>•</span>
              <span>22 người đăng ký</span>
              <span>•</span>
              <span>199 video</span>
            </div>
            <p>Done is better than perfect. </p>
            <div className="flex gap-[10px]">
              <button className="bg-[#333] mt-[10px] rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                Đăng ký
              </button>
              <button className="bg-[#ccc] mt-[10px] px-[10px] rounded-[50px] min-w-[90px] text-[#000] h-[36px]">
                Tùy chỉnh kênh
              </button>
              <Link href="/studio/overview" target="_blank">
                <button className="bg-[#ccc] mt-[10px] px-[10px] rounded-[50px] min-w-[90px] text-[#000] h-[36px]">
                  Quản lý video
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-[20px]">
          <StyledTabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </LayoutDefault>
  );
};

export default Profile;
