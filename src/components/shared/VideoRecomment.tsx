import VideoItem from "../card/VideoItem";

const VideoRecomment: React.FC<any> = ({ vieoRecommend }) => {
  return (
    <div>
      <div className="flex flex-col md:gap-[15px] sm:gap-[30px]">
        {vieoRecommend?.data?.map((video: any) => (
          <VideoItem key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoRecomment;
