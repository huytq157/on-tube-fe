import { Skeleton } from "antd";

const VideoDetailSkeleton = () => {
  return (
    <div>
      <div className="w-[100%] bg-slate-200 h-[550px] rounded-[10px] overflow-hidden">
        <Skeleton.Input
          active
          style={{ width: "100%", height: "100%" }}
          className="rounded-[10px]"
        />
      </div>
      <Skeleton.Input
        active
        className="mt-[10px]"
        style={{ width: "100%", height: 32 }}
      />

      <div className="mt-[12px] flex justify-between">
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px]">
            <Skeleton.Avatar active size={40} shape="circle" />
            <div>
              <Skeleton.Input
                active
                className="mb-[4px]"
                style={{ width: 120, height: 20 }}
              />

              <Skeleton.Input active style={{ width: 80, height: 20 }} />
            </div>
          </div>

          <Skeleton.Button
            active
            shape="round"
            style={{ width: 90, height: 36 }}
          />
        </div>

        <div className="flex gap-[10px]">
          <Skeleton.Button
            active
            shape="round"
            style={{ width: 100, height: 36 }}
          />
          <Skeleton.Button
            active
            shape="round"
            style={{ width: 90, height: 36 }}
          />
          <Skeleton.Button
            active
            shape="round"
            style={{ width: 70, height: 36 }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetailSkeleton;
