import { Modal } from "antd";
import {
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { ModalProps } from "../types";

const ModalShare: React.FC<ModalProps> = ({
  open,
  setIsModalOpen,
  videoId,
}) => {
  const handelClose = () => {
    setIsModalOpen(false);
  };

  const videoUrl = "https://on-tube.vercel.app/";
  const emailShareUrl = `mailto:?subject=Check out this video!&body=I wanted to share this video with you: ${videoUrl}`;

  return (
    <div>
      <Modal
        title="Chia sẻ video"
        open={open}
        onOk={handelClose}
        onCancel={handelClose}
        centered
        footer={null}
        width={280}
      >
        <div className="flex gap-4 justify-center">
          <FacebookShareButton url={videoUrl} title={"Check out this video!"}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={videoUrl} title={"Check out this video!"}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton url={videoUrl} title={"Check out this video!"}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton url={emailShareUrl} title={"Check out this video!"}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <TelegramShareButton url={videoUrl} title={"Check out this video!"}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
      </Modal>
    </div>
  );
};
export default ModalShare;
