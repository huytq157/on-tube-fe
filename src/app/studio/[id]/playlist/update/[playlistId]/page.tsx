"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import { useGetMeQuery } from "@/redux/api/authApi";
import {
  useGetPlaylistByIdQuery,
  useUpdatePlaylistMutation,
} from "@/redux/api/playListApi";
import { selectCurrentToken } from "@/redux/features/authSlice";
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
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";

const UpdatePlaylist = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const { playlistId } = params;
  const router = useRouter();
  const token = useSelector(selectCurrentToken);
  const [updatePlaylist, { isLoading: isUpdateting }] =
    useUpdatePlaylistMutation();
  const { data: playlist } = useGetPlaylistByIdQuery(playlistId);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

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
      message.error("Lỗi khi ");
      console.error(error);
    }
  };
  return (
    <LayoutStudio>
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
