"use client";

import { useState } from "react";
import HeaderStudio from "./HeaderStudio";
import SidebarStudio from "./SidebarStudio";

const LayoutStudio = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[56px] px-[20px]  fixed top-0 w-full z-[100] bg-white">
        <HeaderStudio
          toggleCollapsed={toggleCollapsed}
          toggleDrawer={toggleDrawer}
        />
      </div>
      <div className="flex flex-1  mt-[56px] overflow-y-visible">
        <SidebarStudio
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
        <div className="flex-1 w-[100%] max-w-[2080px] mx-auto px-[15px] py-[20px]  h-[calc(100vh-56px)] ">
          {children}
        </div>
      </div>
    </div>
  );
};

type Props = {
  children: any;
};

export default LayoutStudio;
