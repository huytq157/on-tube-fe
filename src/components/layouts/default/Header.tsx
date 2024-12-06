"use client";

import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { usePathname, useRouter } from "next/navigation";
import TooltipButton from "@/components/shared/TooltipButton";
import MenuIcon from "@/components/icons/Menu";
import LogoIcon from "@/components/icons/Logo";
import CamIcon from "@/components/icons/Cam";
import NotificationIcon from "@/components/icons/Notification";
import { Badge, Divider, Menu, MenuProps, Popover, Space, Spin } from "antd";
import styled from "styled-components";
import LogoutIcon from "@/components/icons/Logout";
import React, { useMemo, useState } from "react";
import BackIcon from "@/components/icons/Back";
import { useLogoutMutation } from "@/redux/api/authApi";
import Search from "@/components/shared/Search";
import SearchIcon from "@/components/icons/Search";
import {
  useGetNotificationQuery,
  useUpdateSeenNotificationMutation,
} from "@/redux/api/notificationApi";
import { calculateCreatedTime } from "@/components/utils/formatDate";
import { LoadingOutlined } from "@ant-design/icons";
import { useUser } from "@/hook/AuthContext";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const StyledMenu = styled(Menu)`
  .ant-menu-item {
    padding-left: 10px !important;
    border-radius: 5px !important;
    margin: 0 !important;
    gap: 10px !important;
  }
`;

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

const items: MenuItem[] = [getItem("Đăng xuất", "logout", <LogoutIcon />)];
const items2: MenuItem[] = [
  getItem("Đăng nhập", "/login"),
  getItem("Đăng ký", "/register"),
];

const Header = ({
  toggleCollapsed,
  toggleDrawer,
}: {
  toggleCollapsed: () => void;
  toggleDrawer: () => void;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showNotify, setShowNotify] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [updateSeenNotification] = useUpdateSeenNotificationMutation();

  const pathname = usePathname();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { user, isAuthenticated, logOut } = useUser();

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await updateSeenNotification({
        notificationId: notification._id,
        user_id: user?.data?._id,
      });
    }
  };
  const {
    data: notifications,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = useGetNotificationQuery(undefined, {
    skip: !isAuthenticated,
  });

  const countNotification = useMemo(() => {
    return notifications?.data?.filter(
      (notification: any) => !notification.read
    )?.length;
  }, [notifications?.data?.length]);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const onMenuClick = (item: any) => {
    if (item.key === "logout") {
      handleLogout();
    } else {
      router.push(item.key);
    }
  };

  const onMenuClick2 = (item: any) => {
    router.push(item.key);
  };

  const contentNotify = (
    <div className="min-w-[300px] ">
      <Divider />
      <div>
        {isNotificationLoading ? (
          <p>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </p>
        ) : notificationError ? (
          <p>Lỗi khi hiện thông báo.</p>
        ) : notifications && notifications?.data?.length > 0 ? (
          notifications?.data?.map((notification: any) => (
            <Link
              href={notification?.url}
              key={notification._id}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="py-2  text-[#000] hover:bg-[#eee] px-3 rounded-md">
                <div className="flex gap-2 items-center">
                  {notification.read ? (
                    <span className="text-gray-500">&#x2714;</span>
                  ) : (
                    <div className="w-[4px] h-[4px] mt-1 bg-blue-700 rounded-[50%]"></div>
                  )}
                  <Image
                    src={notification?.from_user?.avatar}
                    width={30}
                    height={30}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <span className="font-[500] ">
                    {notification?.from_user?.name}
                  </span>{" "}
                  <p>
                    {notification.message} -{" "}
                    {calculateCreatedTime(notification.createdAt)}{" "}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Chưa có thông báo nào.</p>
        )}
      </div>
    </div>
  );

  const contentChannel = (
    <div className="min-w-[280px] ">
      <Space align="start">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
          <Image
            src={user?.data?.avatar || ""}
            width={40}
            height={40}
            alt=""
            className="w-[100%] h-[100%]"
            priority={true}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[17px]">{user?.data?.name}</span>
          <span>{user?.data?.email}</span>
          <Link
            href={`channel/${user?.data?._id}/playlist`}
            className="mt-[5px]"
          >
            Xem kênh của bạn
          </Link>
        </div>
      </Space>
      <div className="w-full h-[0.5px] bg-[#ccc] my-[13px]"></div>

      <StyledMenu
        theme="light"
        defaultSelectedKeys={[]}
        mode="inline"
        items={items}
        onClick={onMenuClick}
      />
    </div>
  );

  const contentAuth = (
    <div className="min-w-[130px] ">
      <StyledMenu
        theme="light"
        defaultSelectedKeys={[]}
        mode="inline"
        items={items2}
        onClick={onMenuClick2}
      />
    </div>
  );

  return (
    <div className="flex justify-between h-[100%] items-center">
      <div className="flex md:gap-[15px] sm:gap-[5px] items-center">
        {isMobile || pathname.startsWith("/video/") ? (
          <TooltipButton Icon={<MenuIcon />} onClick={toggleDrawer} title="" />
        ) : (
          <TooltipButton
            Icon={<MenuIcon />}
            onClick={toggleCollapsed}
            title=""
          />
        )}
        <Link href="/" aria-label="Trang chủ">
          <LogoIcon />
        </Link>
      </div>

      <Search showSearch={showSearch} setShowSearch={setShowSearch} />

      <div className="flex md:gap-[10px] gap-[10px] items-center">
        <div className="sm:block md:hidden">
          <TooltipButton
            title=""
            Icon={<SearchIcon />}
            onClick={() => setShowSearch(true)}
          />
        </div>
        {isAuthenticated && user && (
          <React.Fragment>
            <Link
              href={`/studio/${user?.data?._id}/upload/add-video`}
              target="_blank"
            >
              <TooltipButton title="Tạo video" Icon={<CamIcon />} />
            </Link>
            <div className="sm:hidden md:block">
              <Popover
                content={contentNotify}
                title="Thông báo"
                trigger="click"
                placement="topRight"
              >
                <Badge count={countNotification}>
                  <TooltipButton
                    Icon={<NotificationIcon />}
                    title="Thông báo"
                  />
                </Badge>
              </Popover>
            </div>
            <div className="md:hidden sm:block">
              <Badge count={countNotification}>
                <TooltipButton
                  title=""
                  Icon={<NotificationIcon />}
                  onClick={() => setShowNotify(true)}
                />
              </Badge>
              {showNotify && (
                <div className="absolute top-0 left-0 bg-[#fff] w-full h-[100vh] bottom-0">
                  <TooltipButton
                    title=""
                    Icon={<BackIcon />}
                    onClick={() => setShowNotify(false)}
                  />
                  <div>
                    {isNotificationLoading ? (
                      <p>
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ fontSize: 48 }} spin />
                          }
                        />
                      </p>
                    ) : notificationError ? (
                      <p>Lỗi khi hiện thông báo.</p>
                    ) : notifications && notifications?.data?.length > 0 ? (
                      notifications?.data?.map((notification: any) => (
                        <Link
                          href={notification?.url}
                          key={notification._id}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="py-2  text-[#000] hover:bg-[#eee] px-3 rounded-md">
                            <div className="flex gap-2 items-center">
                              {notification.read ? (
                                <span className="text-gray-500">&#x2714;</span>
                              ) : (
                                <div className="w-[4px] h-[4px] mt-1 bg-blue-700 rounded-[50%]"></div>
                              )}
                              <Image
                                src={notification?.from_user?.avatar}
                                width={30}
                                height={30}
                                priority
                                alt={notification?.from_user?.name}
                                className="w-[30px] h-[30px] rounded-full"
                              />
                              <span className="font-[500] ">
                                {notification?.from_user?.name}
                              </span>{" "}
                              <p>
                                {notification.message} -{" "}
                                {calculateCreatedTime(notification.createdAt)}{" "}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p>Chưa có thông báo nào.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
        <div className="w-[34px] h-[34px] rounded-[50%] overflow-hidden cursor-pointer">
          <Popover
            content={isAuthenticated ? contentChannel : contentAuth}
            trigger="click"
            placement="topRight"
          >
            {user?.data?.avatar ? (
              <Image
                src={user?.data?.avatar || ""}
                width={36}
                height={36}
                alt="channels-avartar"
                className="w-[100%] h-[100%]"
              />
            ) : (
              <div className="w-[36px] h-[36px] rounded-full bg-[#ccc]"></div>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
