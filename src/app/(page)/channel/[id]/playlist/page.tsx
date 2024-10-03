"use client";

import PlaylistCard from "@/components/card/PlaylistCard";
import { useGetChannelPlaylistQuery } from "@/redux/api/channelApi";
import { Skeleton } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

const PlayListChannel = () => {
  const params = useParams();
  const { id } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: playlists, isLoading } = useGetChannelPlaylistQuery({
    id,
    isPublic: true,
    page: currentPage,
    limit: pageSize,
  });

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <Skeleton active />
            </div>
          ))
        ) : playlists?.playlists?.length > 0 ? (
          playlists.playlists.map((playlist: any) => (
            <div key={playlist._id}>
              <PlaylistCard playlist={playlist} />
            </div>
          ))
        ) : (
          <div className="text-center w-full">
            <p>Chưa có danh sách phát</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayListChannel;
