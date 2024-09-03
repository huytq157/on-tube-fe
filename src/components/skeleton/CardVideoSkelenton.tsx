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
          size={36}
          shape="circle"
          style={{ marginRight: "12px" }}
        />
        <div className="flex-1 pr-[20px]">
          <Skeleton
            active
            title={{ width: "100%", style: { margin: "12px 0 4px" } }}
            paragraph={{ rows: 1, width: "80%" }}
          />
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1, width: "60%", style: { marginBottom: 0 } }}
          />
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1, width: "40%", style: { marginTop: "5px" } }}
          />
        </div>
        <div className="mt-[12px] mr-[-15px]">
          <Skeleton.Button
            active
            size="small"
            shape="circle"
            style={{ width: "24px", height: "24px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardVideoSkeleton;
