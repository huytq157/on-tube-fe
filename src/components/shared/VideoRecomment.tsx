import VideoItem from "../card/VideoItem";

const VideoRecomment: React.FC<any> = ({ vieoRecommend }) => {
  console.log("item: ", vieoRecommend);

  return (
    <div className=" min-h-[100vh]">
      <div className="flex flex-col gap-[15px]">
        {vieoRecommend?.data?.map((video: any) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoRecomment;
