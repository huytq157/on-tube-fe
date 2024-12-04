"use client";

import MenuIcon from "@/components/icons/Menu";
import TooltipButton from "@/components/shared/TooltipButton";
import { Divider, Drawer, Menu, MenuProps, message, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Logo_studio } from "../../../../public";
import OverviewIcon from "@/components/icons/Overview";
import VideoIcon from "@/components/icons/Video";
import ListIcon from "@/components/icons/List";
import { useUser } from "@/hook/AuthContext";
import { useLogoutMutation } from "@/redux/api/authApi";

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

const SidebarStudio = ({
  collapsed,
  setCollapsed,
  drawerVisible,
  setDrawerVisible,
}: {
  collapsed: boolean;
  drawerVisible: boolean;
  setCollapsed: (value: boolean) => void;
  setDrawerVisible: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [logout] = useLogoutMutation();
  const { user, logOut } = useUser();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const items: MenuItem[] = [
    getItem(
      "Tổng quan",
      `/studio/${user?.user?._id}/overview`,
      <OverviewIcon />
    ),
    getItem("Playlist", `/studio/${user?.user?._id}/playlist`, <ListIcon />),
    getItem("Video", `/studio/${user?.user?._id}/content`, <VideoIcon />),
  ];

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
      {isMobile ? (
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

              <Tooltip placement="top" title="Xem kênh trên on tube">
                <Link href="/studio">
                  <Image
                    src={Logo_studio}
                    width={95}
                    height={25}
                    alt="Picture of the author"
                  />
                </Link>
              </Tooltip>
            </div>
            <Divider />
            <Link href="/">
              <Image
                src={user?.user?.avatar}
                width={collapsed ? 32 : 100}
                height={collapsed ? 32 : 100}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-full mx-auto "
              />
            </Link>
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
          </Drawer>
        </>
      ) : (
        <div className="h-screen  px-[20px] mt-[5px] overflow-y-auto">
          <div className="text-center mb-[20px] mt-[10px]">
            <div
              className={`${
                collapsed ? "w-[32px] h-[32px]" : "w-[100px] h-[100px]"
              } rounded-[50%] mb-[8px] overflow-hidden cursor-pointer mx-auto`}
            >
              <Tooltip
                placement="bottom"
                color="red"
                title="Xem kênh trên on tube"
              >
                <Link href="/">
                  <Image
                    src={user?.user?.avatar}
                    width={collapsed ? 32 : 100}
                    height={collapsed ? 32 : 100}
                    alt=""
                    className="w-[100%] h-[100%] object-cover"
                  />
                </Link>
              </Tooltip>
            </div>
            {!collapsed && <span>Trần Quang Huy</span>}
          </div>

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
          <div className="text-center">
            <button type="button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarStudio;

const StyledMenu = styled((props: StyledMenuProps) => <Menu {...props} />)<{
  $collapsed: boolean;
}>`
  li.ant-menu-item {
    padding: 13px 16px !important;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px !important;
    width: ${({ $collapsed }) => ($collapsed ? "56px" : "100%")};
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
