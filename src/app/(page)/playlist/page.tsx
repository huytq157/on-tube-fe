"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import PlaylistCard from "@/components/card/PlaylistCard";
import { useGetPlaylistQuery } from "@/redux/api/playListApi";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useUser } from "@/hook/AuthContext";
import Head from "next/head";

const PlayList = () => {
  const { isAuthenticated } = useUser();

  const { data: playlists, isLoading } = useGetPlaylistQuery("", {
    skip: !isAuthenticated,
  });

  return (
    <LayoutDefault>
      <Head>
        <title>Danh Sách Phát - On Tube</title>
        <meta
          name="description"
          content="Khám phá các danh sách phát video yêu thích trên On Tube."
        />
        <meta property="og:title" content="Danh Sách Phát - On Tube" />
        <meta
          property="og:description"
          content="Khám phá các danh sách phát video yêu thích trên On Tube, nơi bạn có thể tìm thấy tất cả các playlist hấp dẫn."
        />
        <meta property="og:image" content="/default-thumbnail.jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <div>
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
              </div>
            ))
          ) : playlists?.data?.length > 0 ? (
            playlists.data.map((playlist: any) => (
              <div key={playlist._id}>
                <PlaylistCard playlist={playlist} />
              </div>
            ))
          ) : (
            <div className="text-center w-full">
              <h2 className="text-md">Chưa có danh sách phát</h2>
            </div>
          )}
        </div>
      </div>
    </LayoutDefault>
  );
};

export default PlayList;
