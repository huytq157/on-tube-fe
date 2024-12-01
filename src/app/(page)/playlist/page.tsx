"use client";

import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import PlaylistCard from "@/components/card/PlaylistCard";
import { useGetPlaylistQuery } from "@/redux/api/playListApi";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useUser } from "@/hook/AuthContext";

const PlayList = () => {
  const { user, isAuthenticated } = useUser();

  const { data: playlists, isLoading } = useGetPlaylistQuery("", {
    skip: !isAuthenticated,
  });

  return (
    <LayoutDefault>
      <div>
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-12">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <CardVideoSkeleton />
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
              <h2 className="text-xl">Chưa có danh sách phát</h2>
            </div>
          )}
        </div>
      </div>
    </LayoutDefault>
  );
};

export default PlayList;
