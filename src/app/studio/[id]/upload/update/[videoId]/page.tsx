"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Switch, DatePicker, Select } from "antd";
import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import moment from "moment";
import { useUploadImageMutation } from "@/redux/api/uploadApi";
import {
  useUpdateVideoMutation,
  useGetVideoByIdQuery,
} from "@/redux/api/videoApi";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useRouter } from "next/navigation";
import { useGetPlaylistQuery } from "@/redux/api/playListApi";
import ImageUpload from "@/components/shared/ImageUpload";
import VideoUpload from "@/components/shared/VideoUpload";
import axios from "axios";
import { useUser } from "@/hook/AuthContext";

const { Option } = Select;
const typeVideo = [
  {
    label: "Video ngắn",
    value: "short",
  },
  {
    label: "Video dài",
    value: "long",
  },
];

const UpdateVideo = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const { videoId } = params;
  const router = useRouter();
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: categories } = useGetCategoryQuery("");
  const { data: playlists } = useGetPlaylistQuery("");
  const { data: video } = useGetVideoByIdQuery(videoId);
  const [uploadImage] = useUploadImageMutation();
  const [updateVideo, { isLoading: isUpdating }] = useUpdateVideoMutation();
  const { user } = useUser();

  useEffect(() => {
    if (video) {
      form.setFieldsValue({
        title: video.data.title,
        description: video.data.description,
        isPublic: video.data.isPublic,
        allowComments: video.data.allowComments,
        category: video.data.category,
        playlist: video.data.playlist,
        tags: video.data.tags,
        videoType: video?.data?.videoType,
        publishedDate: moment(video.data.publishedDate),
      });
      setThumbnailUrl(video.data?.videoThumbnail);
      setVideoUrl(video.data.videoUrl);
    }
  }, [video, form]);

  const handleUploadThumbnail = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      const response = await uploadImage(formData).unwrap();
      setThumbnailUrl(response[0]);
      message.success("Upload ảnh thành công!");
    } catch (error: any) {
      message.error("Lỗi khi upload ảnh.");
    }
  };

  const handleUploadVideo = async (file: File) => {
    const MAX_VIDEO_SIZE_MB = 500;
    if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      message.error("Kích thước video vượt quá giới hạn cho phép.");
      return;
    }

    const formData = new FormData();
    formData.append("videos", file);

    setUploading(true);
    setUploadProgress(0);
    setVideoUrl("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );
      setVideoUrl(response.data.data[0].url);
      message.success("Video đã được tải lên thành công!");
    } catch (error) {
      message.error("Lỗi khi upload video");
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const videoData = {
        ...values,
        videoUrl,
        videoThumbnail: thumbnailUrl,
        publishedDate: values.publishedDate.format("YYYY-MM-DD HH:mm"),
        tags: values.tags || [],
        category: values.category,
        playlist: values.playlist,
      };

      await updateVideo({ videoId, updatedData: videoData }).unwrap();

      message.success("Thành công");
      router.push(`/studio/${user?.data?._id}/content`);
      form.resetFields();
      setVideoUrl("");
      setThumbnailUrl("");
    } catch (error) {
      message.error("Lỗi khi cập nhật video!");
      console.error(error);
    }
  };

  const handleDelete = () => {
    setThumbnailUrl("");
  };
  const handleDeleteVideo = () => {
    setVideoUrl("");
  };

  return (
    <LayoutStudio>
      <Form form={form} onFinish={onFinish} layout="vertical" className="pb-5">
        <Form.Item
          label="Tiêu đề video"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại video"
          name="videoType"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Chọn loại video"
            optionFilterProp="children"
          >
            {typeVideo?.map((item: any) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh video">
          <ImageUpload
            onUpload={handleUploadThumbnail}
            thumbnailUrl={thumbnailUrl}
            onDelete={handleDelete}
          />
        </Form.Item>

        <Form.Item label="Video">
          <div className="flex sm:flex-col md:flex-row gap-[20px]">
            <VideoUpload
              onUpload={handleUploadVideo}
              uploading={uploading}
              uploadProgress={uploadProgress}
              videoUrl={videoUrl}
              onDeleteVideo={handleDeleteVideo}
            />
          </div>
        </Form.Item>

        <Form.Item label="Mô tả video" name="description">
          <ReactQuill theme="snow" />
        </Form.Item>

        <Form.Item
          label="Trạng thái: riêng tư / công khai"
          name="isPublic"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Cho phép bình luận"
          name="allowComments"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Chọn danh mục"
            optionFilterProp="children"
          >
            {categories?.data?.map((category: any) => (
              <Option key={category._id} value={category._id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Danh sách phát" name="playlist">
          <Select
            showSearch
            placeholder="Chọn danh sách phát"
            optionFilterProp="children"
          >
            {playlists?.playlists?.map((playlist: any) => (
              <Option key={playlist._id} value={playlist._id}>
                {playlist.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Add tags" />
        </Form.Item>

        <Form.Item
          label="Ngày công khai"
          name="publishedDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày công khai!" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            defaultValue={moment()}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </LayoutStudio>
  );
};

export default UpdateVideo;
