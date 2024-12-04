"use client";

import Image from "next/image";
import SmellIcon from "../icons/Smell";
import { useState, ChangeEvent } from "react";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import Link from "next/link";
import { useUser } from "@/hook/AuthContext";

const FormComment = () => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const { user } = useUser();

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputValue((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleCancel = () => {
    setIsInputFocused(false);
    setInputValue("");
    setShowEmojiPicker(false);
  };

  return (
    <div>
      {user?.user ? (
        <div className="flex justify-start mb-[30px]">
          <div className="w-[40px] h-[40px] mr-[12px] rounded-[50%] overflow-hidden cursor-pointer">
            <Image
              src={user?.user?.avatar}
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
                className="w-[100%] outline-none border-b-[1px] border-[#504e4e] pb-1"
                onFocus={() => setIsInputFocused(true)}
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
              />
              {isInputFocused && (
                <div className="flex justify-between mt-[5px] items-center">
                  <div className="relative">
                    <div onClick={() => setShowEmojiPicker((prev) => !prev)}>
                      <SmellIcon />
                    </div>
                    {showEmojiPicker && (
                      <div className="absolute top-[100%] left-0">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="bg-transparent min-w-[90px] h-[36px] rounded-[50px] hover:bg-[#f2f2f2] mr-2"
                      onClick={handleCancel}
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className={`mt-[10px] rounded-[50px] min-w-[90px] h-[36px] ${
                        inputValue
                          ? "bg-[#333] text-[#fff]"
                          : "bg-[#ccc] text-[#fff]"
                      }`}
                    >
                      Bình luận
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div>
          Bạn phải
          <Link
            href="/login"
            className="font-semibold leading-6 px-2 text-indigo-600 hover:text-indigo-500"
          >
            Đăng nhập
          </Link>
          để có thể bình luận
        </div>
      )}
    </div>
  );
};

export default FormComment;
