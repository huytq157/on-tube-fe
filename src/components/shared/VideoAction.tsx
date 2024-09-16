import LikeIcon from "@/components/icons/Like";
import DisLikeIcon from "@/components/icons/DisLike";
import SaveIcon from "@/components/icons/Save";

const VideoAction = () => {
  return (
    <div className="flex gap-[10px]">
      <div className="bg-[#f2f2f2] rounded-[50px]">
        <div className="flex flex-wrap items-center h-[100%] py-[5px] px-[10px] ">
          <button className="flex items-center gap-[5px] h-[100%]">
            <LikeIcon /> <strong>0</strong>
          </button>
          <div className="w-[20px] border-[1px] rotate-[-90deg] mx-[10px] border-[#B2B2B2]"></div>
          <button className="flex items-center gap-[5px]">
            <DisLikeIcon />
            <strong>0</strong>
          </button>
        </div>
      </div>
      <button className="bg-[#f2f2f2]  flex items-center gap-[8px] px-[10px] rounded-[50px]">
        <LikeIcon /> <span className="font-semibold">Chia sẻ</span>
      </button>
      <button className="bg-[#f2f2f2] font-semibold flex items-center gap-[10px] px-[10px] rounded-[50px]">
        <SaveIcon /> Lưu
      </button>
    </div>
  );
};

export default VideoAction;
