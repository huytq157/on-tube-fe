import Image from "next/image";
import { NoThumbnail, Video1 } from "../../../public";
import PlayIcon from "../icons/Play";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PlayListCardProps {
  playlist: {
    _id: string;
    title: string;
    isPublic: boolean;
    videos: Array<{
      _id: string;
      title: string;
      videoThumbnail: string;
      videoUrl: string;
    }>;
  };
}

const PlaylistCard: React.FC<PlayListCardProps> = ({ playlist }) => {
  const router = useRouter();
  const videoThumbnail = playlist?.videos.length
    ? playlist.videos[0].videoThumbnail
    : NoThumbnail;

  const handleViewPlaylist = () => {
    router.push(`/playlist/${playlist?._id}`);
  };

  const handlePlayAll = () => {
    const videoId = playlist?.videos[0]?._id;
    if (videoId) {
      router.push(
        `/video/${videoId}?from=playlist&playlistId=${playlist?._id}`
      );
    }
  };

  return (
    <div>
      <div className="relative playlist bg-black rounded-[10px] min-h-[170px]">
        <div className="relative z-[100] w-full h-full">
          <Image
            src={videoThumbnail}
            width={500}
            height={200}
            alt=""
            className="w-full h-[100%] z-50 object-cover rounded-[10px] "
            priority
          />
        </div>

        <div className="absolute bottom-1 text-[14px] z-[100] right-1 bg-black text-[#fff] py-1 px-2 rounded-lg">
          {playlist?.videos.length > 0
            ? `${playlist.videos.length} video`
            : "Không có video nào"}
        </div>
        <div className="box-1"></div>
        <div className="box-2"></div>
        <div className="box-3">
          <div
            className="z-30 cursor-pointer w-full h-full flex justify-center items-center"
            onClick={handlePlayAll}
          >
            <PlayIcon />
            <span className="text-[#fff]">Phát tất cả</span>
          </div>
        </div>
      </div>
      <h3 className="md:mt-[12px] font-[700]  sm:mt-[8px] text-[16px] mb-[4px] text-[#0f0f0f]  cursor-pointer text-line-camp-2">
        {playlist?.title}
      </h3>
      <div className="flex gap-[10px] text-[14px] items-center ">
        <span>{playlist.isPublic ? "Công khai" : "Riêng tư"}</span>
        <span>-</span>
        <span>Danh sách phát</span>
      </div>
      <button
        onClick={handleViewPlaylist}
        className="text-[14px] py-2 font-[500]"
      >
        Xem toàn bộ danh sách phát
      </button>
    </div>
  );
};

export default PlaylistCard;
