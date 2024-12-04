"use client";

import {
  useGetPlaylistQuery,
  useSaveVideoPlaylistMutation,
  useRemoveVideoPlaylistMutation,
  useAddPlaylistMutation,
} from "@/redux/api/playListApi";
import { message, Modal, Input, Select, Button, Checkbox } from "antd";
import PrivateIcon from "../icons/Private";
import PublicIcon from "../icons/Public";
import PlusIcon from "../icons/Plus";
import { useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUser } from "@/hook/AuthContext";
import { ModalProps, Playlist } from "../types";

// interface Playlist {
//   _id: string;
//   title: string;
//   isPublic: boolean;
//   videos: { _id: string }[];
// }

// interface ModalProps {
//   open: boolean;
//   setIsModalOpen: (value: boolean) => void;
//   videoId: string;
// }

const ModalSave: React.FC<ModalProps> = ({ open, setIsModalOpen, videoId }) => {
  const { isAuthenticated } = useUser();
  const { data: playlists } = useGetPlaylistQuery("", {
    skip: !isAuthenticated,
  });
  const [saveVideoPlaylist] = useSaveVideoPlaylistMutation();
  const [removeVideoPlaylist] = useRemoveVideoPlaylistMutation();
  const [addPlaylist] = useAddPlaylistMutation();
  const [checkedPlaylists, setCheckedPlaylists] = useState<string[]>([]);

  const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (playlists) {
      const checkedIds = playlists.playlists
        .filter((playlist: Playlist) =>
          playlist.videos.some((video) => video._id === videoId)
        )
        .map((playlist: Playlist) => playlist._id);

      setCheckedPlaylists(checkedIds);
    }
  }, [playlists, videoId]);

  const onChange = (playlistId: string) => async (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedPlaylists((prev) => [...prev, playlistId]);
      try {
        await saveVideoPlaylist({
          playlistId,
          videoId,
        }).unwrap();
        message.success("Lưu video vào playlist thành công!");
      } catch (error) {
        message.error("Lỗi khi lưu video vào playlist!");
      }
    } else {
      setCheckedPlaylists((prev) => prev.filter((id) => id !== playlistId));
      try {
        await removeVideoPlaylist({
          playlistId,
          videoId,
        }).unwrap();
        message.success("Xóa video khỏi playlist thành công!");
      } catch (error) {
        message.error("Lỗi khi xóa video khỏi playlist!");
      }
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistTitle) {
      message.error("Vui lòng nhập tiêu đề danh sách phát!");
      return;
    }

    try {
      const description = "playlist";
      await addPlaylist({
        title: newPlaylistTitle,
        isPublic,
        description,
      }).unwrap();
      message.success("Tạo danh sách phát mới thành công!");
      setNewPlaylistTitle("");
      setIsPublic(true);
      setShowForm(false);
    } catch (error) {
      message.error("Lỗi khi tạo danh sách phát!");
    }
  };

  const handelClose = () => {
    setIsModalOpen(false);
    setShowForm(false);
  };

  return (
    <div>
      <Modal
        title="Lưu video vào"
        open={open}
        onOk={handelClose}
        onCancel={handelClose}
        centered
        footer={null}
        width={280}
      >
        {playlists?.playlists?.map((item: Playlist) => (
          <div
            key={item?._id}
            className="flex mb-2 items-center justify-between"
          >
            <Checkbox
              checked={checkedPlaylists.includes(item._id)}
              onChange={onChange(item._id)}
            >
              {item?.title}
            </Checkbox>
            {item?.isPublic === true ? <PublicIcon /> : <PrivateIcon />}
          </div>
        ))}

        <Button
          type="dashed"
          icon={<PlusIcon />}
          onClick={() => setShowForm((prev) => !prev)}
          style={{ marginTop: "10px" }}
        >
          Tạo danh sách phát mới
        </Button>

        {showForm && (
          <div className="mt-3">
            <Input
              placeholder="Tiêu đề danh sách phát"
              value={newPlaylistTitle}
              onChange={(e) => setNewPlaylistTitle(e.target.value)}
              style={{ marginBottom: "10px" }}
            />

            <Select
              defaultValue={isPublic ? "Công khai" : "Riêng tư"}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={(value) => setIsPublic(value === "Công khai")}
            >
              <Select.Option value="Công khai">Công khai</Select.Option>
              <Select.Option value="Riêng tư">Riêng tư</Select.Option>
            </Select>

            <Button
              type="primary"
              onClick={handleCreatePlaylist}
              style={{ marginTop: "10px" }}
            >
              Tạo
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalSave;
