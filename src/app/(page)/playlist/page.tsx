"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { Col, Row } from "antd";
import PlaylistCard from "@/components/card/PlaylistCard";
import { useGetPlaylistQuery } from "@/redux/api/playListApi";

const PlayList = () => {
  const { data: playlists } = useGetPlaylistQuery("");

  return (
    <LayoutDefault>
      <div className="md:p-5 ">
        <Row gutter={[18, 48]}>
          {playlists?.playlists?.length > 0 ? (
            playlists.playlists.map((playlist: any) => (
              <Col key={playlist?._id} xs={24} sm={12} lg={8} xl={6} xxl={6}>
                <PlaylistCard playlist={playlist} />
              </Col>
            ))
          ) : (
            <div className="text-center w-full">
              <h2 className="text-xl">Chưa có danh sách phát</h2>
            </div>
          )}
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default PlayList;
