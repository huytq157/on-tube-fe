"use client";

import React from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import Category from "@/components/shared/Category";
import { useGetVideoQuery } from "@/redux/api/videoApi";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";

export default function Home() {
  const { data: video, isLoading } = useGetVideoQuery("");

  return (
    <LayoutDefault>
      <Category />
      <div>
        <Row gutter={[18, 48]}>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <CardVideoSkeleton />
                </Col>
              ))
            : video?.videos.map((item: any) => (
                <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
                  <VideoCard item={item} />
                </Col>
              ))}
        </Row>
      </div>
    </LayoutDefault>
  );
}
