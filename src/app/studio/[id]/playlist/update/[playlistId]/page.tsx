"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import { useUser } from "@/hook/AuthContext";
import {
  useGetPlaylistByIdQuery,
  useUpdatePlaylistMutation,
} from "@/redux/api/playListApi";
import { Form, Input, Button, message, Switch } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdatePlaylist = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const { playlistId } = params;
  const router = useRouter();
  const { user } = useUser();

  const [updatePlaylist, { isLoading: isUpdateting }] =
    useUpdatePlaylistMutation();
  const { data: playlist } = useGetPlaylistByIdQuery(playlistId);

  useEffect(() => {
    if (playlist) {
      form.setFieldsValue({
        title: playlist.playlist.title,
        description: playlist.playlist.description,
        isPublic: playlist.playlist.isPublic,
      });
    }
  }, [playlist, form]);

  const onFinish = async (values: any) => {
    try {
      const playlistData = {
        ...values,
      };

      await updatePlaylist({ playlistId, updatedData: playlistData }).unwrap();

      message.success("Thành công");
      router.push(`/studio/${user?.user?._id}/playlist`);
      form.resetFields();
    } catch (error) {
      message.error("Failed to update");
    }
  };
  return (
    <LayoutStudio>
      <h2 className="mb-2">Chỉnh sửa danh sách phát</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Tiêu đề danh sách phát"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả tiêu đề" name="description">
          <ReactQuill theme="snow" />
        </Form.Item>

        <Form.Item
          label="Trạng thái: riêng tư / công khai"
          name="isPublic"
          valuePropName="checked"
        >
          <Switch />
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

export default UpdatePlaylist;
