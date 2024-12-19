"use client";

import VideoDetail from "@/components/card/VideoDetail";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import PlayList from "@/components/shared/Playlist";
import VideoRecomment from "@/components/shared/VideoRecomment";
import {
  useGetVideoByIdQuery,
  useGetVideoRecommendQuery,
} from "@/redux/api/videoApi";
import { Col, Row } from "antd";
import { useParams } from "next/navigation";

const VideoPage = () => {
  const params = useParams();
  const { id } = params;
  const { data } = useGetVideoByIdQuery(id);
  const { data: recommends } = useGetVideoRecommendQuery(id);

  return (
    <LayoutDefault>
      <div className="md:px-[3.3%] sm:px-0 pb-[20px] h-full">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
            <VideoDetail id={data?.data?._id} video={data?.data} />
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={6}>
            <PlayList video={data?.data} />
            <VideoRecomment vieoRecommend={recommends} />
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default VideoPage;
