"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Switch,
  DatePicker,
  Select,
} from "antd";
import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import moment from "moment";
import {
  useUploadImageMutation,
  useUploadVideoMutation,
} from "@/redux/api/uploadApi";
import {
  useUpdateVideoMutation,
  useGetVideoByIdQuery,
} from "@/redux/api/videoApi";
import Image from "next/image";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetPlaylistQuery } from "@/redux/api/playListApi";

const { Option } = Select;

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
  const [updateVideo, { isLoading: isUpdateting }] = useUpdateVideoMutation();
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (video) {
      form.setFieldsValue({
        title: video.video.title,
        description: video.video.description,
        isPublic: video.video.isPublic,
        allowComments: video.video.allowComments,
        category: video.video.category,
        playlist: video.video.playlist,
        tags: video.video.tags,
        publishedDate: moment(video.video.publishedDate),
      });
      setThumbnailUrl(video?.video?.videoThumbnail);
      setVideoUrl(video?.video?.videoUrl);
    }
  }, [video, form]);

  const handleUploadThumbnail = async ({ file }: any) => {
    const formData = new FormData();
    formData.append("images", file);
    try {
      const response = await uploadImage(formData).unwrap();
      setThumbnailUrl(response[0]);
      message.success("Upload ảnh video thành công!");
    } catch (error) {
      message.error("Lỗi khi upload ảnh.");
    }
  };

  const handleUploadVideo = async (file: any) => {
    const formData = new FormData();
    formData.append("videos", file);

    const xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:8000/api/upload/video", true);
    xhr.open("POST", `${process.env.NEXT_PUBLIC_BASE_URL}/upload/video`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setUploadProgress(percent);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setVideoUrl(response.data[0].url);
        message.success("Upload video thành công");
      } else {
        message.error("Lỗi khi upload");
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      message.error("Upload error.");
      setUploading(false);
    };

    setUploading(true);
    setUploadProgress(0);
    xhr.send(formData);
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
      router.push(`/studio/${user?.user?._id}/content`);
      form.resetFields();
      setVideoUrl("");
      setThumbnailUrl("");
    } catch (error) {
      message.error("Lỗi khi ");
      console.error(error);
    }
  };

  const getFileSize = (size: number) => {
    return size > 1024 ? `${(size / 1024).toFixed(2)} MB` : `${size} KB`;
  };

  return (
    <LayoutStudio>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Ảnh video">
          <Upload
            showUploadList={false}
            customRequest={handleUploadThumbnail}
            accept="image/*"
          >
            <Button>Upload ảnh</Button>
          </Upload>
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              width={200}
              height={100}
              alt="Thumbnail"
            />
          )}
        </Form.Item>

        <Form.Item label="Video">
          <Upload
            showUploadList={false}
            beforeUpload={handleUploadVideo}
            accept="video/*"
          >
            <Button>Tải video lên</Button>
          </Upload>
          {uploading && (
            <div className="mt-2">
              <p>Đang tải lên... {uploadProgress}%</p>
              <div className="progress-bars">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          {videoUrl && (
            <video width="400" controls src={videoUrl} className="mt-[10px]" />
          )}
        </Form.Item>

        <Form.Item
          label="Tiêu đề video"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
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
                {" "}
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
                {" "}
                {playlist.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Add tags">
            {}
          </Select>
        </Form.Item>

        <Form.Item label="Ngày công khai" name="publishedDate">
          <DatePicker
            defaultValue={moment()}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD  HH:mm"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdateting}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </LayoutStudio>
  );
};

export default UpdateVideo;
