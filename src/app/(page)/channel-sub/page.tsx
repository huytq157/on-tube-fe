"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useListSubcriberQuery } from "@/redux/api/subcription";
import { selectCurrentToken } from "@/redux/features/authSlice";
import Image from "next/image";
import { useSelector } from "react-redux";

const ChannelSub = () => {
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const { data: subcribers, isLoading } = useListSubcriberQuery("", {
    skip: !user || !token,
  });

  return (
    <div>
      <LayoutDefault>
        <div className="max-w-[800px] mx-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <p>Loading...</p>
            </div>
          ) : subcribers?.data && subcribers.data.length > 0 ? (
            subcribers.data.map((sub: any) => (
              <div
                key={sub?._id}
                className="flex mt-[15px] sm:flex-col sm:text-center md:flex-row md:text-start items-center gap-[15px]"
              >
                <div className="md:w-[160px] md:h-[160px] sm:w-[100px] sm:h-[100px] rounded-[50%] overflow-hidden">
                  <Image
                    src={sub?.avatar}
                    width={160}
                    height={160}
                    alt="Picture of the author"
                    className="w-[100%] h-[100%] object-fill rounded-[12px]"
                  />
                </div>
                <div className="flex-1 py-2">
                  <h1 className="font-bold text-[25px] mb-3 leading-[32px]">
                    {sub?.name}
                  </h1>
                  <p className="text-[#333] text-[14px]">{sub?.email}</p>
                  <div className="flex gap-3 text-[14px]">
                    <span>20 video </span>
                    <span>22 người đăng ký</span>
                  </div>
                  <p className="text-[14px]">{sub?.description}</p>
                </div>
                <div className="flex sm:justify-center md:justify-start gap-[10px]">
                  <button className="bg-[#333] mt-[10px] rounded-[50px] min-w-[120px] text-[#fff] h-[42px]">
                    Đăng ký
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p>Không có kênh nào.</p>
            </div>
          )}
        </div>
      </LayoutDefault>
    </div>
  );
};

export default ChannelSub;
