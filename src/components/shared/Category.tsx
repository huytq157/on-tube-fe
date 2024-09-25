"use client";

import { useGetCategoryQuery } from "@/redux/api/categoryApi";

const Category = () => {
  const { data: categories } = useGetCategoryQuery("");

  return (
    <div className="flex gap-[10px] mb-[20px] overflow-y-auto">
      <button className="bg-[#333]  rounded-[8px] min-w-[40px] text-[#fff] h-[32px]">
        All
      </button>
      {categories?.data?.map((item: any) => (
        <button
          key={item._id}
          className="bg-[#f2f2f2]  rounded-[8px] min-w-[90px] text-[#000] h-[32px] font-[500]"
        >
          {item?.title}
        </button>
      ))}
    </div>
  );
};

export default Category;
