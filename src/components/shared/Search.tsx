import { useState } from "react";
import BackIcon from "../icons/Back";
import SearchIcon from "../icons/Search";
import VoiceIcon from "../icons/Voice";
import TooltipButton from "./TooltipButton";
import { message } from "antd";
import { useRouter } from "next/navigation";
import CloseIcon from "../icons/Close";

const Search = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSearchText, setVoiceSearchText] = useState("");

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;

    const hide = message.loading("Đang nghe...", 0);

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceSearchText(transcript);
      setIsListening(false);
      hide();
      router.push(`/search?q=${encodeURIComponent(transcript)}`);
    };

    recognition.onerror = (event: any) => {
      console.error("Lỗi nhận dạng giọng nói:", event.error);
      setIsListening(false);
      hide();
    };

    recognition.onend = () => {
      setIsListening(false);
      hide();
    };
  };

  return (
    <>
      <div className="sm:hidden  md:flex gap-[10px]">
        <form className="border-[1px] h-[40px] w-[550px] flex rounded-[40px] overflow-hidden">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full flex-1 h-[100%] border-0 rounded-md pl-[20px] text-[16px] focus:outline-none"
          />
          <TooltipButton Icon={<CloseIcon />} title="" />
          <button className="w-[60px] flex justify-center items-center bg-slate-100">
            <SearchIcon />
          </button>
        </form>
        <div>
          <TooltipButton
            Icon={<VoiceIcon />}
            title=""
            onClick={handleVoiceSearch}
          />
        </div>
      </div>
      <div className="sm:block md:hidden">
        <TooltipButton
          title=""
          Icon={<SearchIcon />}
          onClick={() => setShowSearch(true)}
        />
        {showSearch && (
          <div className="absolute top-0 left-0 bg-[#fff] w-full h-[100vh] bottom-0">
            <TooltipButton
              title=""
              Icon={<BackIcon />}
              onClick={() => setShowSearch(false)}
            />
            <div className="flex px-[10px] gap-[10px]">
              <form className="border-[1px] h-[40px] w-full flex rounded-[40px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="w-full flex-1 h-[100%] border-0 rounded-md pl-[20px] text-[16px] focus:outline-none"
                />

                <button className="w-[60px] flex justify-center items-center bg-slate-100">
                  <SearchIcon />
                </button>
              </form>
              <div>
                <TooltipButton
                  Icon={<VoiceIcon />}
                  title=""
                  onClick={handleVoiceSearch}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
