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
import { Video } from "../../../../public";
import { Divider, Menu, MenuProps, Popover, Space } from "antd";
import styled from "styled-components";
import LogoutIcon from "@/components/icons/Logout";
import CloseIcon from "@/components/icons/Close";

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

const items: MenuItem[] = [
  getItem("Đăng xuất", "/", <LogoutIcon />),
  getItem("Đăng nhập", "/login", <LogoutIcon />),
  getItem("Đăng ký", "/register", <LogoutIcon />),
];
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
  const pathname = usePathname();
  const router = useRouter();

  const onMenuClick = (item: any) => {
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
            src={Video}
            width={40}
            height={40}
            alt=""
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[17px]">Trần Quang Huy</span>
          <span>@quanghuy157</span>
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
        onClick={onMenuClick}
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
        <Popover
          content={content}
          title="Thông báo"
          trigger="click"
          placement="topRight"
        >
          <TooltipButton Icon={<NotificationIcon />} />
        </Popover>
        <div className="sm:block md:hidden">
          <TooltipButton Icon={<SearchIcon />} />
        </div>
        <div className="w-[34px] h-[34px] rounded-[50%] overflow-hidden cursor-pointer">
          <Popover content={content3} trigger="click" placement="topRight">
            <Image
              src={Video}
              width={36}
              height={36}
              alt="channels-avartar"
              className="w-[100%] h-[100%]"
            />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
