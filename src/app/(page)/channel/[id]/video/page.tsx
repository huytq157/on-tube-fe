"use client";
import VideoCard from "@/components/card/VideoCard";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { Col, Row } from "antd";
import { useParams } from "next/navigation";

const VideoChannel = () => {
  const params = useParams();
  const { id } = params;
  const { data: videos, isLoading } = useGetChannelVideoQuery(id);

  return (
    <div>
      <Row gutter={[18, 48]}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} lg={8} xl={8} xxl={6}>
              <CardVideoSkeleton />
            </Col>
          ))
        ) : videos?.videos.length > 0 ? (
          videos.videos.map((video: any) => (
            <Col key={video._id} xs={24} sm={12} lg={8} xl={8} xxl={6}>
              <VideoCard item={video} />
            </Col>
          ))
        ) : (
          <p>Chưa có video nào</p>
        )}
      </Row>
    </div>
  );
};

export default VideoChannel;
