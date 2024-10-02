import { useState, useEffect } from "react";
import BackIcon from "../icons/Back";
import SearchIcon from "../icons/Search";
import VoiceIcon from "../icons/Voice";
import TooltipButton from "./TooltipButton";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "../icons/Close";

interface SearchProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ showSearch, setShowSearch }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTermFromParams = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(searchTermFromParams);
  const [isListening, setIsListening] = useState(false);
  const [voiceSearchText, setVoiceSearchText] = useState("");

  useEffect(() => {
    setSearchTerm(searchTermFromParams);
  }, [searchTermFromParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    const encodedSearchTerm = encodeURIComponent(searchTerm).replace(
      /%20/g,
      "+"
    );
    router.push(`/search?q=${encodedSearchTerm}`);
  };

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
      setSearchTerm(transcript);
      setIsListening(false);
      hide();
      const encodedTranscript = encodeURIComponent(transcript).replace(
        /%20/g,
        "+"
      );
      router.push(`/search?q=${encodedTranscript}`);
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

  const handleClearSearch = () => {
    setSearchTerm("");
    router.push("/search");
  };

  return (
    <div>
      <div className="sm:hidden md:flex gap-[10px]">
        <form
          className="border-[1px] h-[40px] w-[550px] flex rounded-[40px] overflow-hidden"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full flex-1 h-[100%] border-0 rounded-md pl-[20px] text-[16px] focus:outline-none"
          />
          {searchTerm && (
            <TooltipButton
              Icon={<CloseIcon />}
              title=""
              onClick={handleClearSearch}
            />
          )}
          <button
            type="submit"
            className="w-[60px] flex justify-center items-center bg-slate-100"
          >
            <SearchIcon />
            {}
          </button>
        </form>
        <div>
          <TooltipButton
            Icon={<VoiceIcon />}
            title="Tìm kiếm bằng giọng nói"
            onClick={handleVoiceSearch}
          />
        </div>
      </div>

      {/* Search for Mobile */}
      <div className="sm:block md:hidden">
        {showSearch && (
          <div className="absolute top-0 left-0 bg-[#fff] w-full h-[100vh] bottom-0">
            <TooltipButton
              title=""
              Icon={<BackIcon />}
              onClick={() => setShowSearch(false)}
            />
            <div className="flex px-[10px] gap-[10px]">
              <form
                className="border-[1px] h-[40px] w-full flex rounded-[40px] overflow-hidden"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full flex-1 h-[100%] border-0 rounded-md pl-[20px] text-[16px] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-[60px] flex justify-center items-center bg-slate-100"
                >
                  <SearchIcon />.
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
    </div>
  );
};

export default Search;
