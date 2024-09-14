import VideoItem from "../card/VideoItem";

const VideoRecomment = () => {
  return (
    <div className=" min-h-[100vh]">
      <div className="flex flex-col gap-[15px]">
        <VideoItem />
        <VideoItem />
        <VideoItem />
      </div>
    </div>
  );
};

export default VideoRecomment;
