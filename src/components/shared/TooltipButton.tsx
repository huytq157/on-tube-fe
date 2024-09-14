"use client";
import React from "react";
import { Tooltip } from "antd";

interface TooltipButtonProps {
  title?: string;
  Icon: React.ReactNode;
  onClick?: () => void;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  title,
  Icon,
  onClick,
}) => {
  return (
    <Tooltip title={title}>
      <button
        className="w-[40px] h-[40px] rounded-[50%] hover:bg-[#f2f2f2] flex justify-center items-center"
        onClick={onClick}
      >
        {Icon}
      </button>
    </Tooltip>
  );
};

export default TooltipButton;
