"use client";

import CamIcon from "@/components/icons/Cam";
import LogoIcon from "@/components/icons/Logo";
import MenuIcon from "@/components/icons/Menu";
import TooltipButton from "@/components/shared/TooltipButton";
import Image from "next/image";
import Link from "next/link";
import { Logo_studio } from "../../../../public";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/redux/api/authApi";
import { selectCurrentToken } from "@/redux/features/authSlice";

const HeaderStudio = ({
  toggleCollapsed,
  toggleDrawer,
}: {
  toggleCollapsed: () => void;
  toggleDrawer: () => void;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const pathname = usePathname();
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  return (
    <div className="flex justify-between h-[100%] items-center">
      <div className="flex gap-[12px] items-center">
        {isMobile ? (
          <TooltipButton Icon={<MenuIcon />} onClick={toggleDrawer} />
        ) : (
          <TooltipButton Icon={<MenuIcon />} onClick={toggleCollapsed} />
        )}
        <Link href="/studio/overview">
          <Image
            src={Logo_studio}
            width={95}
            height={25}
            alt="Picture of the author"
          />
        </Link>
      </div>

      <div className="flex gap-[10px] items-center">
        <Link href={`/studio/${user?.user?._id}/upload`}>
          <TooltipButton title="Tạo" Icon={<CamIcon />} />
        </Link>

        <div className="w-[34px] h-[34px] rounded-[50%] overflow-hidden cursor-pointer">
          <Image
            src={user?.user?.avatar}
            width={36}
            height={36}
            alt=""
            className="w-[100%] h-[100%]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderStudio;
