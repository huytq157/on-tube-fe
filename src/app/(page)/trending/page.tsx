"use client";

import VideoCard from "@/components/card/VideoCard";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetVideoTrendingQuery } from "@/redux/api/videoApi";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const Trending = () => {
  const { data: trendings, isLoading, refetch } = useGetVideoTrendingQuery("");

  return (
    <LayoutDefault>
      <Row gutter={[18, 48]}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                <CardVideoSkeleton />
              </Col>
            ))
          : trendings.data
              .filter(
                (item: any) =>
                  item.isPublic &&
                  dayjs().isSameOrAfter(dayjs(item.publishedDate), "day")
              )
              .map((item: any) => (
                <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <VideoCard item={item} />
                </Col>
              ))}
      </Row>
    </LayoutDefault>
  );
};

export default Trending;
