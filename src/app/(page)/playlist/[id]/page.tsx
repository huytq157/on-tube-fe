"use client";

import VideoItem from "@/components/card/VideoItem";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetPlaylistDetailQuery } from "@/redux/api/playListApi";
import { Col, Row } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { NoThumbnail } from "../../../../../public";
import { calculateCreatedTime } from "@/components/utils/formatDate";

const PlayListDetail = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { data: playlists } = useGetPlaylistDetailQuery(id);

  const handlePlayAll = () => {
    const videoId = playlists?.playlist?.videos[0]?._id;
    if (videoId) {
      router.push(`/video/${videoId}?from=playlist&playlistId=${id}`);
    }
  };

  return (
    <LayoutDefault>
      <div className="md:px-[20px] sm:px-0 pt-[30px]">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="bg-linear-playlist min-h-[300px] rounded-[10px] p-[20px] text-[#fff]">
              <div className="h-[175px] rounded-[10px] overflow-hidden">
                <Image
                  src={
                    playlists?.playlist?.videos[0]?.videoThumbnail ||
                    "https://res.cloudinary.com/dh0peripq/image/upload/v1734422284/h-tube-image/h-tube-image-1734422283323-download.webp"
                  }
                  width={312}
                  height={175}
                  alt=""
                  loading="lazy"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              <h1 className="text-[18px] text-[#fff] font-[700] py-[10px] font-roboto">
                {playlists?.playlist?.title}
              </h1>
              <div className="flex gap-[15px] font-roboto">
                <span>{playlists?.playlist?.videos?.length} video</span>
                <span>
                  Cập nhật{" "}
                  {calculateCreatedTime(playlists?.playlist?.updatedAt)}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlayAll}
                className="bg-[#fff] my-[15px] text-[14px] rounded-[50px] px-[20px] text-[#000] h-[36px] font-roboto font-semibold"
              >
                Phát tất cả
              </button>
            </div>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <div>
              {playlists?.playlist?.videos &&
              playlists.playlist.videos.length > 0 ? (
                playlists.playlist.videos
                  .filter((video: any) => video.isPublic)
                  .map((item: any) => (
                    <div key={item._id} className="mb-3">
                      <VideoItem video={item} />
                    </div>
                  ))
              ) : (
                <p className="text-center text-[14px]">
                  Chưa có video trong danh sách này
                </p>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default PlayListDetail;
