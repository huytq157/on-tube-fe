"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutDefault = ({ children }: Props) => {
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
      <div className="h-[56px] sm:px-[10px] md:px-[20px]  fixed top-0 w-full z-[100] bg-white">
        <Header toggleCollapsed={toggleCollapsed} toggleDrawer={toggleDrawer} />
      </div>
      <div className="flex flex-1 mt-[56px] overflow-y-visible">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
        <div className="flex-1 w-[100%] overflow-hidden  max-w-[2080px] mx-auto px-[12px] py-[20px]  min-h-[calc(100vh-56px)] ">
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
