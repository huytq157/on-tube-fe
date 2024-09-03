import Image from "next/image";
import { Video } from "../../../public";
import TooltipButton from "../shared/TooltipButton";
import LikeIcon from "../icons/Like";
import DisLikeIcon from "../icons/DisLike";
import { Dropdown, MenuProps } from "antd";
import Option2Icon from "../icons/Option2";

const items: MenuProps["items"] = [
  {
    label: <li className="flex gap-[10px]">Sửa</li>,
    key: "0",
  },
  {
    label: <li className="flex gap-[10px]">Xóa</li>,
    key: "1",
  },
];

const CommentItem = () => {
  return (
    <div className="flex justify-start">
      <div className="w-[40px] h-[40px] mr-[12px]  rounded-[50%] overflow-hidden cursor-pointer">
        <Image
          src={Video}
          width={40}
          height={40}
          alt=""
          className="w-[100%] h-[100%]"
        />
      </div>
      <div className="flex-1">
        <div className="flex gap-[7px]">
          <span className="text-[#000] bg-[#ccc] px-[5px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[3px]">
            @Huy Offical
          </span>
          <span>3 tháng trước</span>
        </div>
        <div className="py-[5px]">
          <p>
            Anh sài nodejs phiên bản bao nhiêu vậy anh? Anh sài nodejs phiên bản
            bao nhiêu vậy anh? Anh sài nodejs phiên bản bao nhiêu vậy anh? Anh
            sài nodejs phiên bản bao nhiêu vậy anh? Anh sài nodejs phiên bản bao
            nhiêu vậy anh? Anh sài nodejs phiên bản bao nhiêu vậy anh?
          </p>
        </div>
        <div className="ml-[-10px] flex items-center">
          <TooltipButton title="Thích" Icon={<LikeIcon />} />
          <TooltipButton title="Không thích" Icon={<DisLikeIcon />} />
          <button className="font-semibold ml-4">Phản hồi</button>
        </div>
      </div>

      <div className="mt-[12px] mr-[-15px]">
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <TooltipButton Icon={<Option2Icon />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default CommentItem;
