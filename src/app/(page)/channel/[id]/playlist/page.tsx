"use client";

import PlaylistCard from "@/components/card/PlaylistCard";
import { useGetChannelPlaylistQuery } from "@/redux/api/channelApi";
import { useGetPlaylistQuery } from "@/redux/api/playListApi";
import { Col, Row } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

const PlayListChannel = () => {
  const params = useParams();
  const { id } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: playlists,
    isLoading,
    refetch,
  } = useGetChannelPlaylistQuery({
    id,
    isPublic: true,
    page: currentPage,
    limit: pageSize,
  });

  return (
    <div>
      <Row gutter={[18, 48]}>
        {playlists?.playlists?.length > 0 ? (
          playlists.playlists.map((playlist: any) => (
            <Col key={playlist?._id} xs={24} sm={12} lg={8} xl={6} xxl={6}>
              <PlaylistCard playlist={playlist} />
            </Col>
          ))
        ) : (
          <div className="text-center w-full">
            <h2 className="text-[14px]">Chưa có danh sách phát</h2>
          </div>
        )}
      </Row>
    </div>
  );
};

export default PlayListChannel;
