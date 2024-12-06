"use client";

import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useSearchVideoQuery } from "@/redux/api/videoApi";
import { useSearchChannelQuery } from "@/redux/api/channelApi";
import { Col, Row, Tabs } from "antd";
import { useSearchParams } from "next/navigation";
import ChannelItem from "@/components/card/ChannelItem";

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

  const tabItems = [
    {
      label: "Videos",
      key: "1",
      children: (
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
      ),
    },
    {
      label: "Kênh",
      key: "2",
      children: (
        <div className="flex justify-center md:w-[50%] sm:w-full">
          <Row gutter={[18, 48]}>
            {isLoadingChannels ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            ) : channelResults && channelResults.results?.length > 0 ? (
              channelResults.results.map((item: any) => (
                <Col key={item?._id} xs={24} sm={24} lg={24} xl={24} xxl={24}>
                  <ChannelItem sub={item} />
                </Col>
              ))
            ) : (
              <p>
                Không tìm thấy kênh cho từ khóa{" "}
                <strong>&ldquo;{searchTerm}&rdquo;</strong>
              </p>
            )}
          </Row>
        </div>
      ),
    },
  ];

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
        items={tabItems}
      />
    </LayoutDefault>
  );
};

export default PageResult;
