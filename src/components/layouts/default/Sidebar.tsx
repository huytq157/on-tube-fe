"use client";

import React, { useState } from "react";
import { Menu, MenuProps, Drawer, Divider } from "antd";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

import LogoIcon from "@/components/icons/Logo";
import HomeIcon from "@/components/icons/Home";
import SubIcon from "@/components/icons/Sub";
import TrendIcon from "@/components/icons/Trend";
import ClockIcon from "@/components/icons/Clock";
import ListIcon from "@/components/icons/List";
import VideoIcon from "@/components/icons/Video";
import LikeIcon from "@/components/icons/Like";
import TooltipButton from "@/components/shared/TooltipButton";
import MenuIcon from "@/components/icons/Menu";
import { useListSubcriberQuery } from "@/redux/api/subcription";
import { useUser } from "@/hook/AuthContext";

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
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const { user, isAuthenticated } = useUser();
  const { data: subcribers } = useListSubcriberQuery("", {
    skip: !isAuthenticated,
  });

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const items: MenuItem[] = [
    getItem("Trang chủ", "/", <HomeIcon />),
    getItem("Kênh đăng ký", "/subcription", <SubIcon />),
    getItem("Thịnh hành", "/trending", <TrendIcon />),
    ...(user
      ? [
          getItem("Danh sách phát", "/playlist", <ListIcon />),
          getItem("Video đã thích", "/favourite", <LikeIcon />),
          getItem(
            "Video của bạn",
            `/studio/${user?.user?._id}/content`,
            <VideoIcon />
          ),
        ]
      : []),
    getItem("Video đã xem", `/history`, <ClockIcon />),
  ];

  const onMenuClick = (item: any) => {
    if (item.key === `/studio/${user?.user?._id}/content`) {
      window.open(item.key, "_blank");
    } else {
      router.push(item.key);
    }
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
                title=""
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
            {isAuthenticated && (
              <div>
                <h3 className="font-semibold font-roboto mb-3">Kênh đăng ký</h3>
                {subcribers?.data?.map((sub: any) => (
                  <div
                    key={sub?._id}
                    className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px] h-[40px] hover:bg-[#f2f2f2]"
                  >
                    <div className="w-[24px] h-[24px] rounded-[50%] overflow-hidden cursor-pointer">
                      <Image
                        src={sub?.avatar}
                        width={28}
                        height={28}
                        alt=""
                        className="w-[100%] h-[100%]"
                      />
                    </div>
                    <span className="text-line-camp-1 flex-1 font-semibold font-roboto">
                      {sub?.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
          {!collapsed && isAuthenticated && (
            <div className="px-[8px]">
              <Divider />
              <h3 className="font-[600] mb-3">Kênh đăng ký</h3>
              {subcribers?.data?.map((sub: any) => (
                <div
                  onClick={() => router.push(`/channel/${sub?._id}`)}
                  key={sub?._id}
                  className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px] h-[40px] hover:bg-[#f2f2f2]"
                >
                  <div className="w-[24px] h-[24px] rounded-[50%] overflow-hidden cursor-pointer">
                    <Image
                      src={sub?.avatar}
                      width={24}
                      height={24}
                      alt=""
                      className="w-[100%] h-[100%]"
                    />
                  </div>
                  <span className="text-line-camp-1 flex-1">{sub?.name}</span>
                </div>
              ))}
            </div>
          )}

          {!collapsed && !isAuthenticated && (
            <>
              <Divider />
              <div className="px-[20px]">
                <p className="text-[14px] text-[#333] mb-2" aria-live="polite">
                  Hãy đăng nhập để thích video, bình luận và đăng ký kênh.
                </p>
                <Link href="/login">
                  <button
                    type="button"
                    className="bg-[#333] text-[14px] rounded-[50px] px-[13px] text-[#fff] h-[36px]"
                    aria-label="Đăng nhập để tiếp tục"
                  >
                    Đăng nhập
                  </button>
                </Link>
              </div>
            </>
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
    width: ${({ $collapsed }) => ($collapsed ? "56px" : "230px")};
    transition: none;
  }

  li.ant-menu-item.ant-menu-item-selected {
    background-color: #f2f2f2;
    color: #333;
    border-radius: 8px;
    height: 42px;
    font-weight: 700 !important;
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
