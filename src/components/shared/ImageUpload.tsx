import React, { useState } from "react";
import { Upload, Button, message, Spin } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";
import { ImageUploadProps } from "../types";

const { Dragger } = Upload;

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  thumbnailUrl,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      await onUpload(file);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    onDelete();
    message.info("Ảnh đã được xóa.");
  };

  return (
    <div className="flex  sm:flex-col md:flex-row items-start gap-[20px]">
      <Dragger
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        accept="image/*"
        className="md:w-[250px] h-[250px] sm:w-full p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 hover:border-blue-500 transition-all duration-200"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        </p>
        <p className="ant-upload-text">Kéo và thả ảnh vào đây hoặc</p>
        <Button icon={<UploadOutlined />} disabled={loading}>
          Chọn ảnh
        </Button>
      </Dragger>

      <div className="justify-center flex flex-col md:w-[250px] h-[250px] sm:w-full items-center ">
        {loading ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : (
          thumbnailUrl && (
            <div className="relative">
              <Image
                src={thumbnailUrl}
                alt="Thumbnail"
                width={250}
                height={250}
                className="rounded h-[100%] w-[100%]"
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full"
              ></Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
