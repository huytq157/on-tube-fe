import { Skeleton } from "antd";

const CardVideoSkeleton = () => {
  return (
    <div>
      <div className="rounded-[10px] overflow-hidden bg-[#eee] w-full cursor-pointer">
        <Skeleton.Image
          active
          className="!w-[100%] !h-[250px] object-cover"
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div className="flex gap-[5px] mt-[12px]">
        <Skeleton.Avatar
          active
          size={42}
          shape="circle"
          style={{ marginRight: "12px" }}
        />
        <div className="flex-1 pr-[20px]">
          <Skeleton
            active
            title={{ width: "100%", style: { margin: "4px 0 4px" } }}
            paragraph={{ rows: 1, width: "80%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardVideoSkeleton;
