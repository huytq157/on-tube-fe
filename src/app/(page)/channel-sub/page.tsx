"use client";

import ChannelItem from "@/components/card/ChannelItem";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useListSubcriberQuery } from "@/redux/api/subcription";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
          <h1 className="font-semibold text-[22px] py-4">
            Tất cả kênh đăng ký
          </h1>
          {isLoading ? (
            <div className="text-center py-10">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          ) : subcribers?.data && subcribers.data.length > 0 ? (
            subcribers.data.map((sub: any) => (
              <ChannelItem sub={sub} key={sub?._id} />
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
