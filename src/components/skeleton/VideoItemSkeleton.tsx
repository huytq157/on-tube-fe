import { Skeleton } from "antd";

const VideoItemSkeleton = () => {
  return (
    <div className="flex gap-[10px] mb-3">
      <div className="rounded-[10px] flex-1 w-full overflow-hidden bg-[#ccc]  cursor-pointer">
        <Skeleton.Image className="!w-[100%] !h-[120px]" />
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-[5px]">
          <Skeleton.Input
            active
            className="mb-[4px]"
            style={{ width: "100%", height: 30 }}
          />
          <Skeleton.Input
            active
            style={{ width: "85%", marginBottom: "10px", height: 25 }}
          />
          <Skeleton.Input active style={{ width: 50, height: 18 }} />
        </div>
      </div>
    </div>
  );
};

export default VideoItemSkeleton;
