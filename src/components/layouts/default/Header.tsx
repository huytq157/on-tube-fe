"use client";

import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { usePathname, useRouter } from "next/navigation";
import TooltipButton from "@/components/shared/TooltipButton";
import MenuIcon from "@/components/icons/Menu";
import LogoIcon from "@/components/icons/Logo";
import SearchIcon from "@/components/icons/Search";
import CamIcon from "@/components/icons/Cam";
import NotificationIcon from "@/components/icons/Notification";
import { Back, Video } from "../../../../public";
import { Divider, Menu, MenuProps, message, Popover, Space } from "antd";
import styled from "styled-components";
import LogoutIcon from "@/components/icons/Logout";
import CloseIcon from "@/components/icons/Close";
import { useState } from "react";
import BackIcon from "@/components/icons/Back";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentToken } from "@/redux/features/authSlice";

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
  const [showSearch, setShowSearch] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    message.success("Đăng xuất thành công");
  };

  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const onMenuClick = (item: any) => {
    if (item.key === "logout") {
      handleLogout();
      console.log("đăgn xuất");
    } else {
      router.push(item.key);
    }
  };
  const onMenuClick2 = (item: any) => {
    router.push(item.key);
  };

  const content = (
    <div className="w-[300px] ">
      <Divider />
      <p className="text-center">Chưa có thông báo nào</p>
    </div>
  );

  const content2 = (
    <div className="min-w-[280px] ">
      <Space align="start">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
          <Image
            src={user?.user?.avatar || ""}
            width={40}
            height={40}
            alt=""
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[17px]">{user?.user?.name}</span>
          <span>{user?.user?.email}</span>
          <Link href="/me" className="mt-[5px]">
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

  const content3 = (
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
          <TooltipButton Icon={<MenuIcon />} onClick={toggleDrawer} />
        ) : (
          <TooltipButton Icon={<MenuIcon />} onClick={toggleCollapsed} />
        )}
        <Link href="/">
          <LogoIcon />
        </Link>
      </div>

      <div className="sm:hidden md:block">
        <form className="border-[1px] h-[40px] w-[550px] flex rounded-[40px] overflow-hidden">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full flex-1 h-[100%] border-0 rounded-md pl-[20px] text-[16px] focus:outline-none"
          />
          <TooltipButton Icon={<CloseIcon />} />
          <button className="w-[60px] flex justify-center items-center bg-slate-100">
            <SearchIcon />
          </button>
        </form>
      </div>

      <div className="flex gap-[10px] items-center">
        <Link href="/studio/upload">
          <TooltipButton title="Tạo" Icon={<CamIcon />} />
        </Link>
        <div className="sm:hidden md:block">
          <Popover
            content={content}
            title="Thông báo"
            trigger="click"
            placement="topRight"
          >
            <TooltipButton Icon={<NotificationIcon />} />
          </Popover>
        </div>
        <div className="md:hidden sm:block">
          <TooltipButton
            Icon={<NotificationIcon />}
            onClick={() => setShowNotify(true)}
          />
          {showNotify && (
            <div className="absolute top-0 left-0 bg-[#fff] w-full h-[100vh] bottom-0">
              <TooltipButton
                Icon={<BackIcon />}
                onClick={() => setShowNotify(false)}
              />
              <div className="p-[10px]">Thông báo</div>
            </div>
          )}
        </div>
        <div className="sm:block md:hidden">
          <TooltipButton
            Icon={<SearchIcon />}
            onClick={() => setShowSearch(true)}
          />
          {showSearch && (
            <div className="absolute top-0 left-0 bg-[#fff] w-full h-[100vh] bottom-0">
              <TooltipButton
                Icon={<BackIcon />}
                onClick={() => setShowSearch(false)}
              />
              <div className="p-[10px]">Tìm kiếm</div>
            </div>
          )}
        </div>
        <div className="w-[34px] h-[34px] rounded-[50%] overflow-hidden cursor-pointer">
          <Popover
            content={user ? content2 : content3}
            trigger="click"
            placement="topRight"
          >
            {user?.user?.avatar ? (
              <Image
                src={user?.user?.avatar || ""}
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
