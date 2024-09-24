"use client";

import VideoItem from "@/components/card/VideoItem";
import HistoryIcon from "@/components/icons/History";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetMeQuery } from "@/redux/api/authApi";
import { selectCurrentToken } from "@/redux/features/authSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

const History = () => {
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  return (
    <LayoutDefault>
      {user ? (
        <>Video đã xem</>
      ) : (
        <div className="h-[100vh] flex justify-center pt-[100px] text-center">
          <div>
            <div className="flex justify-center mb-[10px]">
              <HistoryIcon />
            </div>
            <span className="text-[22px] font-[500] my-[20px]">
              Theo dõi nội dung mà bạn xem
            </span>
            <p className="py-[15px]">
              Bạn không thể xem được nhật kí xem khi đã đăng xuất
            </p>
            <Link href="/login">
              <button className="bg-[#333] rounded-[50px] px-[15px] min-w-[90px] text-[#fff] h-[36px]">
                Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      )}
    </LayoutDefault>
  );
};

export default History;
