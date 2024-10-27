import React, { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface VideoUploadProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
  uploadProgress: number;
  videoUrl: string;
  onDeleteVideo: () => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  onUpload,
  uploading,
  uploadProgress,
  videoUrl,
  onDeleteVideo,
}) => {
  const [fileSize, setFileSize] = useState(0);
  const [fileDuration, setFileDuration] = useState(0);
  const [uploadStartTime, setUploadStartTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (uploading && uploadProgress > 0 && uploadStartTime) {
      const timeElapsed =
        (new Date().getTime() - uploadStartTime.getTime()) / 1000;
      const estimatedTotalTime = timeElapsed / (uploadProgress / 100);
      setRemainingTime(Math.max(0, estimatedTotalTime - timeElapsed));
    }

    // if (uploadProgress === 100 && videoUrl) {
    //   message.success("Video đã được tải lên thành công!");
    // }
  }, [uploading, uploadProgress, uploadStartTime, videoUrl]);

  const handleBeforeUpload = (file: File) => {
    setFileSize(file.size);
    setUploadStartTime(new Date());

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.src = URL.createObjectURL(file);
    videoElement.onloadedmetadata = () => {
      URL.revokeObjectURL(videoElement.src);
      setFileDuration(videoElement.duration);
      onUpload(file);
    };
    return false;
  };

  const formatFileSize = (size: number) => {
    return size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return minutes > 0
      ? `${minutes} phút ${seconds < 10 ? "0" : ""}${seconds} giây`
      : `${seconds} giây`;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes} phút ${seconds} giây`;
  };

  return (
    <div>
      <div className="flex sm:flex-col md:flex-row items-start gap-[20px]">
        <Dragger
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          accept="video/*"
          className="md:w-[250px] h-[250px] sm:w-full  p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 hover:border-blue-500 transition-all duration-200"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Kéo và thả video vào đây hoặc</p>
          <Button>Tải video lên</Button>
        </Dragger>

        {videoUrl && (
          <div className="mt-4 relative">
            <video width="400" height="100%" controls src={videoUrl} />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                onDeleteVideo();
                message.info("Video đã được xóa.");
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full"
            ></Button>
          </div>
        )}
      </div>

      {uploading && (
        <div className="mt-2">
          <p>Đang tải lên... {uploadProgress}%</p>
          <div className="progress-bars h-2 bg-gray-200 rounded">
            <div
              className="progress-fill h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            <p>Kích thước: {formatFileSize(fileSize)}</p>
            <p>Thời lượng: {formatDuration(fileDuration)}</p>
            <p>Thời gian còn lại: {formatTime(remainingTime)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
