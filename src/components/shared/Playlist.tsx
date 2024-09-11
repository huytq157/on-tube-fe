import VideoCard from "../card/VideoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import { useGetVideoQuery } from "@/redux/api/videoApi";

const Playlist = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });

  const slidesPerView = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide>
        <SwiperSlide>
          <VideoCard />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Playlist;
