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

import { useState } from "react";
import {
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
} from "@/redux/api/playListApi";

const Playlist = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const {
    data: playlists,
    isLoading,
    refetch,
  } = useGetPlaylistQuery({ page: currentPage, limit: pageSize });
  const [deletePlaylist, { isLoading: isDeleting }] =
    useDeletePlaylistMutation();
  const token = useSelector(selectCurrentToken);
  const { data: user } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const handleDelete = async (playlistId: string) => {
    try {
      await deletePlaylist(playlistId).unwrap();
      message.success("Xóa danh sách phát thành công!");
      refetch();
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa danh sách phát!");
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
      title: "Số lượng video",
      key: "videoCount",
      render: (record: any) => record.videos.length,
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
                  `/studio/${user?.user?._id}/playlist/update/${record._id}`
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
            <Tooltip title="Xóa danh sách phát">
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

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <LayoutStudio>
      <Table
        dataSource={playlists?.playlists}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: playlists?.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </LayoutStudio>
  );
};

export default Playlist;
