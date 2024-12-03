"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutDefault = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  if (!isClient) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[56px] sm:px-[10px] md:px-[20px]  fixed top-0 w-full z-[100] bg-white">
        <Header toggleCollapsed={toggleCollapsed} toggleDrawer={toggleDrawer} />
      </div>

      <div className="flex flex-1 mt-[56px] overflow-hidden">
        <div className="sticky h-[calc(100vh-56px)] sidebar-custom-scrollbar  ">
          <Sidebar
            collapsed={collapsed}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        </div>

        <div className="flex-1 overflow-y-auto max-w-[100%] overflow-x-hidden mx-auto px-[12px] pt-[10px] pb-[20px] min-h-[calc(100vh-56px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

type Props = {
  children: any;
};

export default LayoutDefault;
