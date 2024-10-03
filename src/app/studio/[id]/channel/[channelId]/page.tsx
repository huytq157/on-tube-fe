"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import {
  useGetChannelInfoQuery,
  useUpdateChannelMutation,
} from "@/redux/api/channelApi";
import { useUploadImageMutation } from "@/redux/api/uploadApi";
import { Button, Form, Image, Input, message, Upload } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateVideo = () => {
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
        name: channel?.channel?.name,
        description: channel?.channel?.description,
        email: channel?.channel?.email,
      });
      setAvatar(channel?.channel?.avatar);
      setBackground(channel?.channel?.background);
    }
  }, [channel, form]);

  const handleUploadAvatar = async ({ file }: any) => {
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
  const handleUploadBackground = async ({ file }: any) => {
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

  return (
    <div>
      <LayoutStudio>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Ảnh video">
            <Upload
              showUploadList={false}
              customRequest={handleUploadAvatar}
              accept="image/*"
            >
              <Button>Upload</Button>
            </Upload>
            {avatar && (
              <Image src={avatar} width={200} height={200} alt="Thumbnail" />
            )}
          </Form.Item>
          <Form.Item label="Ảnh background">
            <Upload
              showUploadList={false}
              customRequest={handleUploadBackground}
              accept="image/*"
            >
              <Button>Upload</Button>
            </Upload>
            {background && (
              <Image
                src={background}
                width={1000}
                height={200}
                alt="Thumbnail"
              />
            )}
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

export default UpdateVideo;
