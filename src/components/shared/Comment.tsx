import { Dropdown, MenuProps } from "antd";
import VideoItem from "../card/VideoItem";
import FormComment from "../card/FormComment";
import CommentItem from "../card/CommentItem";
import SortIcon from "@/components/icons/Sort";

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

const Comments = () => {
  return (
    <div>
      <div className="flex items-center gap-[25px] mb-[24px]">
        <span className="text-[20px] font-semibold">20 bình luận</span>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button className="flex font-[500] gap-[5px]">
            <SortIcon /> Sắp xếp theo
          </button>
        </Dropdown>
      </div>

      <FormComment />
      <CommentItem />
    </div>
  );
};

export default Comments;
