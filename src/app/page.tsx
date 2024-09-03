"use client";
import React from "react";
import VideoCard from "@/components/card/VideoCard";
import { Col, Row } from "antd";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import Category from "@/components/shared/Category";

export default function Home() {
  return (
    <LayoutDefault>
      <Category />
      <div>
        <Row gutter={[18, 48]}>
          <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <VideoCard />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <VideoCard />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <VideoCard />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <VideoCard />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <VideoCard />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8} xxl={6}>
            <VideoCard />
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
}
