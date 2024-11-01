"use client";

import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useSearchVideoQuery } from "@/redux/api/videoApi";
import { useSearchChannelQuery } from "@/redux/api/channelApi";
import { Col, Row, Tabs } from "antd";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const PageResult = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");

  const { data: videoResults, isLoading: isLoadingVideos } =
    useSearchVideoQuery(searchTerm || "", {
      skip: !searchTerm,
    });

  const { data: channelResults, isLoading: isLoadingChannels } =
    useSearchChannelQuery(searchTerm || "", {
      skip: !searchTerm,
    });

  return (
    <LayoutDefault>
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{
          color: "#333",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "'Roboto Condensed', sans-serif",
        }}
      >
        <Tabs.TabPane tab="Videos" key="1">
          <Row gutter={[18, 48]}>
            {isLoadingVideos ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            ) : videoResults && videoResults.results?.length > 0 ? (
              videoResults.results.map((item: any) => (
                <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <VideoCard item={item} />
                </Col>
              ))
            ) : (
              <p>
                Không tìm thấy video cho từ khóa{" "}
                <strong>&ldquo;{searchTerm}&rdquo;</strong>
              </p>
            )}
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="kênh" key="2">
          <Row gutter={[18, 48]}>
            {isLoadingChannels ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />{" "}
                </Col>
              ))
            ) : channelResults && channelResults.results?.length > 0 ? (
              channelResults.results.map((item: any) => (
                <Col key={item._id} xs={24} sm={24} lg={24} xl={24} xxl={24}>
                  <div className="flex gap-[20px] my-3 items-center">
                    <div className="w-[100px]  h-[100px] bg-black rounded-[50%] overflow-hidden">
                      <Link href={`/channel/${item?._id}/playlist`}>
                        <Image
                          src={item?.avatar}
                          width={300}
                          height={100}
                          alt={item.title}
                          priority
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link href={`/channel/${item?._id}/playlist`}>
                        <h1 className="font-[600] text-[#000] text-[20px]">
                          {item.name}
                        </h1>
                      </Link>
                      <p>{item.email}</p>
                      <p>{item?.description}</p>
                    </div>

                    <button className="bg-[#333] rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                      Đăng ký
                    </button>
                  </div>
                </Col>
              ))
            ) : (
              <p>
                Không tìm thấy kênh cho từ khóa{" "}
                <strong>&ldquo;{searchTerm}&rdquo;</strong>
              </p>
            )}
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </LayoutDefault>
  );
};

export default PageResult;
