import VideoItem from "../card/VideoItem";

const VideoRecomment: React.FC<any> = ({ vieoRecommend }) => {
  return (
    <div>
      <div className="flex flex-col gap-[5px]">
        {vieoRecommend?.data?.map((video: any) => (
          <VideoItem key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoRecomment;
