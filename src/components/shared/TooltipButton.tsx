"use client";
import React from "react";
import { Tooltip } from "antd";

interface TooltipButtonProps {
  title?: string;
  Icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  title,
  Icon,
  onClick,
  className = "",
}) => {
  return (
    <Tooltip title={title}>
      <button
        type="button"
        className={`w-[40px] h-[40px] rounded-[50%] hover:bg-[#f2f2f2] flex justify-center items-center ${className}`}
        onClick={onClick}
        aria-label={title || "button"}
      >
        {Icon}
      </button>
    </Tooltip>
  );
};

export default TooltipButton;
