"use client";

import { Col, Dropdown, MenuProps, Row, Skeleton } from "antd";
import Image from "next/image";
import LikeIcon from "@/components/icons/Like";
import DisLikeIcon from "@/components/icons/DisLike";
import SaveIcon from "@/components/icons/Save";
import VideoItem from "@/components/card/VideoItem";
import SortIcon from "@/components/icons/Sort";
import CommentItem from "@/components/card/CommentItem";
import FormComment from "@/components/card/FormComment";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useParams } from "next/navigation";
import { useGetVideoByIdQuery } from "@/redux/api/videoApi";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import VideoDetailSkeleton from "@/components/skeleton/VideoDetailSkeleton";

const items: MenuProps["items"] = [
  {
    label: <li className="flex gap-[10px]">Bình luận hàng đầu</li>,
    key: "0",
  },
  {
    label: <li className="flex gap-[10px]">Mới nhất xếp trước</li>,
    key: "1",
  },
];

const VideoDetail = () => {
  const params = useParams();
  const { id } = params;
  const { data: video, isLoading, isError } = useGetVideoByIdQuery(id);

  return (
    <LayoutDefault>
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
                  <div className="w-[100%] bg-slate-200 h-[550px] rounded-[10px] overflow-hidden">
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

                <div className="flex gap-[10px]">
                  <div className="bg-[#f2f2f2] rounded-[50px]">
                    <div className="flex items-center h-[36px] px-[10px] ">
                      <button className="flex items-center gap-[5px]">
                        <LikeIcon /> <strong>{video?.video?.likesCount}</strong>
                      </button>
                      <div className="w-[20px] border-[1px] rotate-[-90deg] mx-[15px] border-[#B2B2B2]"></div>
                      <button className="flex items-center gap-[5px]">
                        <DisLikeIcon />
                        <strong>{video?.video?.dislikesCount}</strong>
                      </button>
                    </div>
                  </div>
                  <button className="bg-[#f2f2f2] font-semibold flex items-center gap-[10px] px-[10px] rounded-[50px]">
                    <LikeIcon /> Chia sẻ
                  </button>
                  <button className="bg-[#f2f2f2] font-semibold flex items-center gap-[10px] px-[10px] rounded-[50px]">
                    <SaveIcon /> Lưu
                  </button>
                </div>
              </div>
              <div className="bg-[#f2f2f2]  min-h-[50px] rounded-[5px] mt-[15px] mb-[24px] p-[10px]">
                {video?.video?.description}
              </div>

              <div className="flex items-center gap-[25px] mb-[24px]">
                <span className="text-[20px] font-semibold">
                  {video?.video?.commentsCount} bình luận
                </span>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <button className="flex font-[500] gap-[5px]">
                    <SortIcon /> Sắp xếp theo
                  </button>
                </Dropdown>
              </div>

              <FormComment />
              <CommentItem />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <div className=" min-h-[100vh]">
              <div className="flex flex-col gap-[15px]">
                <VideoItem />
                <VideoItem />
                <VideoItem />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default VideoDetail;
