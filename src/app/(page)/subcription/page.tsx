"use client";

import GridIcon from "@/components/icons/Grid";
import GridDetail from "@/components/icons/GridDetail";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import Playlist from "@/components/shared/Playlist";

const Subscription = () => {
  return (
    <LayoutDefault>
      <div className="px-[10px] pt-[10px]">
        <div className="flex items-center justify-end gap-[15px]">
          <button className="bg-[#333]  rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
            Quản lý
          </button>
          <button>
            <GridIcon />
          </button>
          <button>
            <GridDetail />
          </button>
        </div>

        <Playlist />
      </div>
    </LayoutDefault>
  );
};

export default Subscription;
