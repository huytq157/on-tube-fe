"use client";

import React, { useEffect, useState } from "react";
import { Menu, MenuProps, Drawer, Divider, message } from "antd";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

import LogoIcon from "@/components/icons/Logo";
import HomeIcon from "@/components/icons/Home";
import SubIcon from "@/components/icons/Sub";
import TrendIcon from "@/components/icons/Trend";
import ChannelIcon from "@/components/icons/Channel";
import ClockIcon from "@/components/icons/Clock";
import ListIcon from "@/components/icons/List";
import VideoIcon from "@/components/icons/Video";
import LaterIcon from "@/components/icons/Later";
import LikeIcon from "@/components/icons/Like";
import DownLoadIcon from "@/components/icons/DownLoad";
import TooltipButton from "@/components/shared/TooltipButton";
import MenuIcon from "@/components/icons/Menu";

import { Video } from "../../../../public";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/authSlice";

function getItem(
  label: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];

interface StyledMenuProps extends MenuProps {
  $collapsed: boolean;
}

const items: MenuItem[] = [
  getItem("Trang chủ", "/", <HomeIcon />),
  getItem("Kênh đăng ký", "/subcription", <SubIcon />),
  getItem("Thịnh hành", "/trending", <TrendIcon />),
  getItem("Kênh của bạn", "/me", <ChannelIcon />),
  getItem("Video đã xem", "/history", <ClockIcon />),
  getItem("Danh sách phát", "/playlist", <ListIcon />),
  getItem("Video của ban", "/video1", <VideoIcon />),
  getItem("Xem sau", "/video2", <LaterIcon />),
  getItem("Video đã thích", "/video3", <LikeIcon />),
  getItem("Nôi dung đã tải xuống", "/video4", <DownLoadIcon />),
];

const Sidebar = ({
  collapsed,
  drawerVisible,
  setDrawerVisible,
}: {
  collapsed: boolean;
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dispatch = useDispatch();

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const onMenuClick = (item: any) => {
    router.push(item.key);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  return (
    <>
      {isMobile || pathname.startsWith("/video/") ? (
        <>
          <Drawer
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={240}
          >
            <div className="flex gap-[15px] ml-2 items-center">
              <TooltipButton
                Icon={<MenuIcon />}
                onClick={() => setDrawerVisible(false)}
              />
              <Link href="/">
                <LogoIcon />
              </Link>
            </div>
            <Divider />
            <StyledMenu
              theme="light"
              defaultSelectedKeys={["/"]}
              mode="inline"
              items={items}
              $collapsed={collapsed}
              selectedKeys={[pathname]}
              onOpenChange={onOpenChange}
              onClick={onMenuClick}
            />
            <Divider />

            <div className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px] h-[40px] hover:bg-[#f2f2f2]">
              <div className="w-[24px] h-[24px] rounded-[50%] overflow-hidden cursor-pointer">
                <Image
                  src={Video}
                  width={24}
                  height={24}
                  alt=""
                  className="w-[100%] h-[100%]"
                />
              </div>
              <span className="text-line-camp-1 flex-1">
                Challenge Me Hãy Thách Thức Tôi
              </span>
            </div>
          </Drawer>
        </>
      ) : (
        <div className="h-screen sm:hidden md:block  max-w-[240px] px-[10px] mt-[5px] overflow-y-auto ">
          <StyledMenu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
            $collapsed={collapsed}
            selectedKeys={[pathname]}
            onOpenChange={onOpenChange}
            onClick={onMenuClick}
          />
          {!collapsed && (
            <div className="px-[8px]">
              <Divider />
              <h3 className="font-[600] mb-3">Kênh đăng ký</h3>
              <div className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px] h-[40px] hover:bg-[#f2f2f2]">
                <div className="w-[24px] h-[24px] rounded-[50%] overflow-hidden cursor-pointer">
                  <Image
                    src={Video}
                    width={24}
                    height={24}
                    alt=""
                    className="w-[100%] h-[100%]"
                  />
                </div>
                <span className="text-line-camp-1 flex-1">
                  Challenge Me Hãy Thách Thức Tôi
                </span>
              </div>
              <div className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px] h-[40px] hover:bg-[#f2f2f2]">
                <div className="w-[24px] h-[24px] rounded-[50%] overflow-hidden cursor-pointer">
                  <Image
                    src={Video}
                    width={24}
                    height={24}
                    alt=""
                    className="w-[100%] h-[100%]"
                  />
                </div>
                <span className="text-line-camp-1 flex-1">Kẻ du mục</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;

const StyledMenu = styled((props: StyledMenuProps) => <Menu {...props} />)<{
  $collapsed: boolean;
}>`
  li.ant-menu-item {
    padding: 16px !important;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px !important;
    width: ${({ $collapsed }) => ($collapsed ? "56px" : "100%")};
    transition: none;
  }

  li.ant-menu-item.ant-menu-item-selected {
    background-color: #f2f2f2;
    color: #333;
    border-radius: 8px;
    height: 42px;
    font-weight: 550 !important;
  }

  .ant-menu-title-content {
    margin-left: 15px;
    font-size: 14px;
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
  }

  li.ant-menu-item.ant-menu-item-selected path {
    fill: #000;
  }
`;
