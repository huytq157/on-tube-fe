"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import { useUser } from "@/hook/AuthContext";
import { useAddPlaylistMutation } from "@/redux/api/playListApi";
import { Form, Input, Button, message, Switch } from "antd";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPlaylist = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { user } = useUser();
  const [addPlaylist, { isLoading: isAddting }] = useAddPlaylistMutation();

  const onFinish = async (values: any) => {
    try {
      const playlistData = {
        ...values,
      };

      await addPlaylist(playlistData).unwrap();

      message.success("Thành công");
      router.push(`/studio/${user?.user?._id}/playlist`);
      form.resetFields();
    } catch (error) {
      message.error("Failed to update");
    }
  };

  return (
    <LayoutStudio>
      <h2 className="mb-2">Thêm danh sách phát</h2>
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
          <Button type="primary" htmlType="submit" loading={isAddting}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </LayoutStudio>
  );
};

export default AddPlaylist;
