const Category = () => {
  return (
    <div className="flex gap-[10px] mb-[20px] overflow-y-auto">
      <button className="bg-[#333]  rounded-[8px] min-w-[40px] text-[#fff] h-[32px]">
        All
      </button>
      <button className="bg-[#f2f2f2]  rounded-[8px] min-w-[90px] text-[#000] h-[32px] font-[500]">
        Tin tức
      </button>
      <button className="bg-[#f2f2f2]  rounded-[8px] min-w-[90px] text-[#000] h-[32px] font-[500]">
        Âm nhạc
      </button>
      <button className="bg-[#f2f2f2]  rounded-[8px] min-w-[90px] text-[#000] h-[32px] font-[500]">
        Bóng đá
      </button>
      <button className="bg-[#f2f2f2]  rounded-[8px] min-w-[90px] text-[#000] h-[32px] font-[500]">
        Du lịch
      </button>
      <button className="bg-[#f2f2f2] px-[10px] rounded-[8px] min-w-[90px] text-[#000] h-[32px] font-[500]">
        Nấu ăn
      </button>
    </div>
  );
};

export default Category;
