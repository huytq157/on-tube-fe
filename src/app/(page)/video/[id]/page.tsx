import VideoDetail from "@/components/card/VideoDetail";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import PlayList from "@/components/shared/Playlist";
import VideoRecomment from "@/components/shared/VideoRecomment";
import { Col, Row } from "antd";
import { notFound } from "next/navigation";

async function getVideoById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${id}`,
    {
      cache: "reload",
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.data || null;
}

async function getRecommendedVideos(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list/recommend/${id}`,
    {
      cache: "reload",
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data;
}

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const video = await getVideoById(params.id);

  const recommendedVideos = await getRecommendedVideos(params.id);
  if (!video) {
    notFound();
  }

  return (
    <LayoutDefault>
      <div className="md:px-[3.3%] sm:px-0 pb-[20px] h-full">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
            <VideoDetail id={video?._id} video={video} />
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={6}>
            <PlayList video={video} />
            <VideoRecomment vieoRecommend={recommendedVideos} />
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
}
