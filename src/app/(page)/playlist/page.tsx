"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import { Col, Row } from "antd";
import PlaylistCard from "@/components/card/PlaylistCard";
import { useGetPlaylistQuery } from "@/redux/api/categoryApi";

const PlayList = () => {
  const { data: playlists } = useGetPlaylistQuery("");

  return (
    <LayoutDefault>
      <div className="p-5">
        <Row gutter={[18, 48]}>
          {playlists?.playlists?.map((playlist: any) => (
            <Col key={playlist?._id} xs={24} sm={12} lg={8} xl={6} xxl={6}>
              <PlaylistCard playlist={playlist} />
            </Col>
          ))}
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default PlayList;
