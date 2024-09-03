"use client";

import { Col, Dropdown, MenuProps, Row } from "antd";
import Image from "next/image";
import { Video } from "../../../../../public";
import LikeIcon from "@/components/icons/Like";
import DisLikeIcon from "@/components/icons/DisLike";
import SaveIcon from "@/components/icons/Save";
import VideoItem from "@/components/card/VideoItem";
import SortIcon from "@/components/icons/Sort";
import CommentItem from "@/components/card/CommentItem";
import FormComment from "@/components/card/FormComment";
import LayoutDefault from "@/components/layouts/default/LayoutDefault";

const items: MenuProps["items"] = [
  {
    label: <li className="flex gap-[10px]">Bình luận hàng đầu</li>,
    key: "0",
  },
  {
    label: <li className="flex gap-[10px]">Mới nhất xếp trước</li>,
    key: "1",
  },
];

const VideoDetail = () => {
  return (
    <LayoutDefault>
      <div className="px-[30px]">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={4} md={6} lg={8} xl={16}>
            <div className="min-h-[1000vh]">
              <div className="w-[100%] bg-slate-100 h-[550px] rounded-[10px] overflow-hidden">
                <video controls className="w-[100%] h-[100%]" autoPlay>
                  <source
                    src="https://example.com/video.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <h1 className="text-[22px] leading-[32px] font-semibold mt-[10px]">
                Next.js 14 Complete Course 2024 | Next.js 14 Full Stack App
                Tutorial for Beginners
              </h1>
              <div className="mt-[12px] flex justify-between flex-wrap">
                <div className=" flex items-center gap-[20px]">
                  <div className="flex items-center gap-[15px] px-[10px] cursor-pointer rounded-[8px]">
                    <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer">
                      <Image
                        src={Video}
                        width={40}
                        height={40}
                        alt=""
                        className="w-[100%] h-[100%]"
                      />
                    </div>
                    <div>
                      <span className="text-line-camp-1 font-semibold leading-[20px]">
                        Challenge Me
                      </span>
                      <span className="text-line-camp-1  text-[#606060] leading-[20px]">
                        16 người đăng ký
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#333]  rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                      Đăng ký
                    </button>
                  </div>
                </div>

                <div className="flex gap-[10px]">
                  <div className="bg-[#f2f2f2] rounded-[50px]">
                    <div className="flex items-center h-[36px] px-[10px] ">
                      <button className="flex item-center gap-[5px]">
                        <LikeIcon /> <strong>22</strong>
                      </button>
                      <div className="w-[20px] border-[1px] rotate-[-90deg] mx-[15px] border-[#B2B2B2]"></div>
                      <button className="flex item-center gap-[5px]">
                        <DisLikeIcon />
                        <strong>1</strong>
                      </button>
                    </div>
                  </div>
                  <button className="bg-[#f2f2f2] font-semibold flex items-center gap-[10px] px-[10px] rounded-[50px]">
                    <LikeIcon /> Chia sẻ
                  </button>
                  <button className="bg-[#f2f2f2] font-semibold flex items-center gap-[10px] px-[10px] rounded-[50px]">
                    <SaveIcon /> Lưu
                  </button>
                </div>
              </div>
              <div className="bg-[#f2f2f2]  h-[200px] rounded-[5px] mt-[15px] mb-[24px] p-[10px]">
                Content
              </div>

              <div className="flex items-center gap-[25px] mb-[24px]">
                <span className="text-[20px] font-semibold">22 bình luận</span>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <button className="flex font-[500] gap-[5px]">
                    <SortIcon /> Sắp xếp theo
                  </button>
                </Dropdown>
              </div>

              <FormComment />
              <CommentItem />
            </div>
          </Col>
          <Col xs={24} sm={16} md={12} lg={8} xl={8}>
            <div className=" min-h-[100vh]">
              <div className="flex flex-col gap-[15px]">
                <VideoItem />
                <VideoItem />
                <VideoItem />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </LayoutDefault>
  );
};

export default VideoDetail;
