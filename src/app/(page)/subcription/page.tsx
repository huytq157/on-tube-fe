"use client";

import FavouriteIcon from "@/components/icons/Favourite";
import GridIcon from "@/components/icons/Grid";
import GridDetail from "@/components/icons/GridDetail";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetMeQuery } from "@/redux/api/authApi";
import { selectCurrentToken } from "@/redux/features/authSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

const Subscription = () => {
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  return (
    <LayoutDefault>
      <div className="px-[10px] pt-[10px]">
        {user ? (
          <div className="flex items-center justify-end gap-[15px] mb-[20px]">
            <button className="bg-[#333]  rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
              Quản lý
            </button>
            <button>
              <GridIcon />
              {}
            </button>
            <button>
              <GridDetail />
              {}
            </button>
          </div>
        ) : (
          <div className="h-[100vh] flex justify-center pt-[100px] text-center">
            <div>
              <div className="flex justify-center mb-[10px]">
                <FavouriteIcon />
              </div>
              <span className="text-[22px] font-[500] my-[20px]">
                Đừng bỏ lỡ video mới
              </span>
              <p className="py-[15px]">
                Đăng nhập để xem cập nhật từ các kênh Youtube yêu thích của bạn
              </p>
              <Link href="/login">
                <button className="bg-[#333] rounded-[50px] px-[15px] min-w-[90px] text-[#fff] h-[36px]">
                  Đăng nhập
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </LayoutDefault>
  );
};

export default Subscription;
