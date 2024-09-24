"use client";

import LayoutStudio from "@/components/layouts/studio/LayoutStudio";
import { useGetChannelVideoQuery } from "@/redux/api/channelApi";
import { useParams } from "next/navigation";
import { Table, Spin, Switch, Button, message, Popconfirm } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useDeleteVideoMutation } from "@/redux/api/videoApi";

const Content = () => {
  const params = useParams();
  const { id } = params;

  const { data: videos, isLoading, refetch } = useGetChannelVideoQuery(id);
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();

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
      title: "Bình luận cho phép",
      dataIndex: "allowComments",
      key: "allowComments",
      render: (allowComments: boolean) => (
        <Switch checked={allowComments} disabled />
      ),
    },

    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-[10px] items-center">
          <Link target="_blank" href={`/video/${record._id}`}>
            Xem Video
          </Link>
          <Button type="primary" style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa video này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger loading={isDeleting}>
              Xóa
            </Button>
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
