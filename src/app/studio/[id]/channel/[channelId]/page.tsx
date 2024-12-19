"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import ImageUpload from "@/components/shared/ImageUpload";
import {
  useGetChannelInfoQuery,
  useUpdateChannelMutation,
} from "@/redux/api/channelApi";
import { useUploadImageMutation } from "@/redux/api/uploadApi";
import { Button, Form, Input, message } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateChannel = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const { channelId } = params;
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const { data: channel } = useGetChannelInfoQuery(channelId);

  const [updateChannel, { isLoading: isUpdateting }] =
    useUpdateChannelMutation();
  const [uploadImage] = useUploadImageMutation();

  useEffect(() => {
    if (channel) {
      form.setFieldsValue({
        name: channel?.data?.name,
        description: channel?.data?.description,
        email: channel?.data?.email,
      });
      setAvatar(channel?.data?.avatar);
      setBackground(channel?.data?.background);
    }
  }, [channel, form]);

  const handleUploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    try {
      const response = await uploadImage(formData).unwrap();
      setAvatar(response[0]);
      message.success("Upload ảnh avatar thành công!");
    } catch (error) {
      message.error("Lỗi khi upload ảnh.");
    }
  };

  const handleUploadBackground = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    try {
      const response = await uploadImage(formData).unwrap();
      setBackground(response[0]);
      message.success("Upload ảnh background thành công!");
    } catch (error) {
      message.error("Lỗi khi upload ảnh.");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const channelData = {
        ...values,
        avatar: avatar,
        background: background,
      };

      await updateChannel({ channelId, data: channelData }).unwrap();

      message.success("Thành công");

      form.resetFields();
    } catch (error) {
      message.error("Lỗi khi ");
      console.error(error);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar("");
  };

  const handleDeleteBg = () => {
    setBackground("");
  };

  return (
    <div>
      <LayoutStudio>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Ảnh video">
            <ImageUpload
              onUpload={handleUploadAvatar}
              thumbnailUrl={avatar}
              onDelete={handleDeleteAvatar}
            />
          </Form.Item>
          <Form.Item label="Ảnh background">
            <ImageUpload
              onUpload={handleUploadBackground}
              thumbnailUrl={background}
              onDelete={handleDeleteBg}
            />
          </Form.Item>

          <Form.Item
            label="Tiêu kênh"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả kênh" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUpdateting}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </LayoutStudio>
    </div>
  );
};

export default UpdateChannel;
