"use client";

import VideoItem from "@/components/card/VideoItem";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { useGetPlaylistByIdQuery } from "@/redux/api/playListApi";
import { Col, Row } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { NoThumbnail } from "../../../../../public";
import { calculateCreatedTime } from "@/components/utils/formatDate";

const PlayListDetail = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const { data: playlists } = useGetPlaylistByIdQuery(id);

  console.log("playlists: ", playlists);

  const videoThumbnail = playlists?.playlist.videos.length
    ? playlists.playlist?.videos[0].videoThumbnail
    : NoThumbnail;

  return (
    <LayoutDefault>
      <div className="px-[20px] pt-[30px]">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="bg-linear-playlist h-[500px] rounded-[10px] p-[20px] text-[#fff]">
              <div className="h-[175px] rounded-[10px] overflow-hidden">
                <Image
                  src={videoThumbnail}
                  width={312}
                  height={175}
                  alt=""
                  loading="lazy"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              <h1 className="text-[18px] text-[#fff] font-[700] py-[10px]">
                {playlists?.playlist?.title}
              </h1>
              <div className="flex gap-[15px]">
                <span>{playlists?.playlist?.videos?.length} video</span>
                <span>
                  Cập nhật{" "}
                  {calculateCreatedTime(playlists?.playlist?.updatedAt)}
                </span>
              </div>

              <button className="bg-[#fff] my-[15px] text-[14px] rounded-[50px] px-[20px] text-[#000] h-[36px]">
                Phát tất cả
              </button>

              <p>{playlists?.playlist?.description}</p>
            </div>
          </Col>

          <Col xs={24} sm={24} md={18} lg={18}>
            <div>
              {playlists?.playlist?.videos &&
              playlists.playlist.videos.length > 0 ? (
                playlists.playlist.videos.map((item: any) => (
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
