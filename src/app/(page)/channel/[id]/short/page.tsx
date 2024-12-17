"use client";

import VideoCard from "@/components/card/VideoCard";
import CardVideoSkeleton from "@/components/skeleton/CardVideoSkelenton";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { useParams } from "next/navigation";
import { useState } from "react";

const ShortChannel = () => {
  return <div>đang cập nhật ...</div>;
};

export default ShortChannel;
