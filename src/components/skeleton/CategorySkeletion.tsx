import React from "react";
import { Skeleton } from "antd";

const CategorySkeleton = () => {
  const buttons = Array(10).fill(null);

  return (
    <div className="flex gap-[10px] mb-[20px]">
      {buttons.map((_, index) => (
        <Skeleton.Button
          key={index}
          active
          shape="round"
          style={{
            width: index === 0 ? "40px" : index === 6 ? "120px" : "90px",
            height: "32px",
          }}
        />
      ))}
    </div>
  );
};

export default CategorySkeleton;
