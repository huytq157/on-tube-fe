"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  Spin,
  Switch,
  Button,
  message,
  Popconfirm,
  Tooltip,
  Badge,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useDeleteVideoMutation } from "@/redux/api/videoApi";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";

const Content = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { data: videos, isLoading, refetch } = useGetChannelVideoQuery(id);
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const handleDelete = async (videoId: string) => {
    try {
      await deleteVideo(videoId).unwrap();
      message.success("Xóa video thành công!");
      refetch();
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa video!");
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Video",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (videoUrl: string) => (
        <video width="300" height="200" controls>
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "videoThumbnail",
      key: "videoThumbnail",
      render: (thumbnail: string) => (
        <Image width={200} height={150} src={thumbnail} alt="thumbnail" />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isPublic",
      key: "isPublic",
      render: (isPublic: boolean) => (
        <Button type={isPublic ? "primary" : "default"}>
          {isPublic ? "Công khai" : "Riêng tư"}
        </Button>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "totalView",
      key: "totalView",
    },
    {
      title: "Ngày đăng",
      dataIndex: "publishedDate",
      key: "publishedDate",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Lượt thích",
      dataIndex: "likesCount",
      key: "likesCount",
    },
    {
      title: "Lượt không thích",
      dataIndex: "dislikesCount",
      key: "dislikesCount",
    },
    {
      title: " Cho phép bình luận",
      dataIndex: "allowComments",
      key: "allowComments",
      render: (allowComments: boolean) => (
        <Button type={allowComments ? "primary" : "default"}>
          {allowComments ? "Cho phép" : "Không cho phép"}
        </Button>
      ),
    },

    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-[10px] items-center">
          <Link target="_blank" href={`/video/${record._id}`}>
            <Tooltip title="Xem video">
              <Button type="primary" shape="circle" icon={<EyeOutlined />} />
            </Tooltip>
          </Link>

          <Tooltip title="Update video">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() =>
                router.push(
                  `/studio/${user?.user?._id}/upload/update/${record._id}`
                )
              }
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa video này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa video">
              <Button
                type="primary"
                color="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                loading={isDeleting}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Spin tip="Đang tải..." />;
  }

  return (
    <LayoutStudio>
      <Table dataSource={videos?.videos} columns={columns} rowKey="id" />
    </LayoutStudio>
  );
};

export default Content;

// http://localhost:3001/studio/66e02262656729492255ec34/upload/add-video
// http://localhost:3001/studio/66e02262656729492255ec34/upload/66f378c75b76effc90097dd1
