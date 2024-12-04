"use client";

import { useGetPlaylistDetailQuery } from "@/redux/api/playListApi";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PrivateIcon from "../icons/Private";
import PublicIcon from "../icons/Public";
import { VideoPlaylistProps } from "../types";

const PlayList: React.FC<VideoPlaylistProps> = ({ video }) => {
  const searchParams = useSearchParams();
  const fromPlaylist = searchParams.get("from") === "playlist";
  const playlistId = searchParams.get("playlistId");

  const { data: playlists } = useGetPlaylistDetailQuery(playlistId, {
    skip: !playlistId,
  });

  const isCurrentVideoPlaying = (videoId: string) => {
    return videoId === video?._id;
  };

  return (
    <div>
      {fromPlaylist && (
        <div className="min-h-[100px] max-h-[500px] overflow-hidden overflow-y-auto w-full border-[1px]  rounded-[10px] p-[15px] mb-4">
          <div className="header">
            <span className="text-[18px]  font-[700] font-roboto">
              {playlists?.playlist?.title}
            </span>

            <div className="flex gap-[10px] mt-3 items-center">
              <span className="border-[1px] flex rounded-[10px] px-2 py-1 gap-1 font-roboto">
                {playlists?.playlist?.isPublic === true ? (
                  <PublicIcon />
                ) : (
                  <PrivateIcon />
                )}
                {playlists?.playlist?.isPublic === true
                  ? "Công khai"
                  : "Riêng tư"}
              </span>
              <span className="font-roboto font-thin">
                {playlists?.playlist?.writer?.name}
              </span>
            </div>
          </div>
          <div className="mt-3">
            {playlists?.playlist?.videos
              .filter((item: any) => item.isPublic)
              .map((item: any, index: number) => (
                <div
                  key={item?._id}
                  className={`flex gap-[10px] rounded-[10px] p-2  ${
                    isCurrentVideoPlaying(item?._id)
                      ? "bg-[rgb(223,236,229)]"
                      : ""
                  }`}
                >
                  <span className="flex items-center">{index + 1}</span>
                  <div className="rounded-[7px] flex-2 h-[60px] overflow-hidden">
                    <Link
                      href={`/video/${item?._id}?from=playlist&playlistId=${playlistId}`}
                    >
                      <Image
                        src={item?.videoThumbnail || ""}
                        width={120}
                        height={56}
                        alt=""
                        className="w-[100%] h-[100%] object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/video/${item?._id}?from=playlist&playlistId=${playlistId}`}
                    >
                      <h3 className="font-[500] text-[#000] mb-1  !text-[13px] leading-[16px] text-line-camp-2">
                        {item?.title}
                      </h3>
                    </Link>
                    <span className="text-[12px] text-[#3b3b3b] font-roboto font-[400]">
                      {item?.writer?.name}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayList;
