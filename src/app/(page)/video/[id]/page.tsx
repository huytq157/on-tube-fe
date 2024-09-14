"use client";

import { Col, Row, Skeleton } from "antd";
import Image from "next/image";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useParams } from "next/navigation";
import { useGetVideoByIdQuery } from "@/redux/api/videoApi";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import VideoRecomment from "@/components/shared/VideoRecomment";
import Comments from "@/components/shared/Comment";
import VideoAction from "@/components/shared/VideoAction";
import Head from "next/head";

const VideoDetail = () => {
  const params = useParams();
  const { id } = params;
  const { data: video, isLoading, isError } = useGetVideoByIdQuery(id);

  return (
    <LayoutDefault>
      <Head>
        <title>{video?.video?.title || "on-tube"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:px-[20px] sm:px-0">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={16}>
            <div className="min-h-[100vh]">
              <div className="w-[100%] bg-slate-500  rounded-[10px] overflow-hidden">
                {video?.video?.videoUrl ? (
                  <CldVideoPlayer
                    src={video.video.videoUrl}
                    controls
                    autoplay
                    pictureInPictureToggle
                    transformation={{
                      streaming_profile: "hd",
                    }}
                    sourceTypes={["hls"]}
                  />
                ) : (
                  <div className="w-[100%] bg-slate-200 md:h-[550px] sm:h-[220px] rounded-[10px] overflow-hidden">
                    <Skeleton.Input
                      active
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-[10px]"
                    />
                  </div>
                )}
              </div>
              <h1 className="sm:text-[18px] md:text-[22px] leading-[32px] font-semibold mt-[10px]">
                {video?.video?.title}
              </h1>
              <div className="mt-[12px] flex justify-between flex-wrap gap-[15px]">
                <div className=" flex items-center gap-[20px]">
                  <div className="flex items-center gap-[15px] md:px-[10px] cursor-pointer rounded-[8px]">
                    <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
                      <Image
                        src={video?.video?.writer?.avatar}
                        width={40}
                        height={40}
                        alt=""
                        className="w-[100%] h-[100%]"
                      />
                    </div>
                    <div>
                      <span className="text-line-camp-1 font-semibold leading-[20px]">
                        {video?.video?.writer?.name}
                      </span>
                      <span className="text-line-camp-1  text-[#606060] leading-[20px]">
                        16 người đăng ký
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#333]  rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                      Đăng ký
                    </button>
                  </div>
                </div>
                <VideoAction />
              </div>
              <div className="bg-[#f2f2f2]  min-h-[50px] rounded-[5px] mt-[15px] mb-[24px] p-[10px]">
                {video?.video?.description}
              </div>

              <Comments />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <VideoRecomment />
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default VideoDetail;
