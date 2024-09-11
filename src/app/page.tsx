"use client";

import React from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import Category from "@/components/shared/Category";
import { useGetVideoQuery } from "@/redux/api/videoApi";

export default function Home() {
  const { data: video } = useGetVideoQuery("");

  return (
    <LayoutDefault>
      <Category />
      <div>
        <Row gutter={[18, 48]}>
          {video?.videos.map((item: any, index: number) => (
            <Col key={item._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
              <VideoCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </LayoutDefault>
  );
}
