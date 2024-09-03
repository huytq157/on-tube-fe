import Image from "next/image";
import { Video } from "../../../public";
import SmellIcon from "../icons/Smell";

const FormComment = () => {
  return (
    <div className="flex justify-start mb-[30px]">
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
        <form>
          <input
            placeholder="Viết bình luận ..."
            className="w-[100%] outline-none border-b-[1px] border-[#000] pb-1"
          />
          <div className="flex justify-between mt-[5px] items-center">
            <SmellIcon />
            <div>
              <button className="bg-transparent min-w-[90px] h-[36px] rounded-[50px] hover:bg-[#f2f2f2] mr-2">
                Hủy
              </button>
              <button className="bg-[#333] mt-[10px] rounded-[50px] min-w-[90px] text-[#fff] h-[36px]">
                Đăng ký
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComment;
