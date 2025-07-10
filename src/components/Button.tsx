import React from "react";
import WritingIcon from "./icon/WritingIcon";

interface ButtonType {
  text: string;
  type: "orange" | "gray" | "white-orange" | "white-gray";
  image?: boolean;
  className?: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ text, type, image = false, className = "w-full", isDisabled = false, onClick }: ButtonType) {
  let color = "";
  if (type === "gray" || isDisabled) {
    color = "bg-gray-100 text-white";
  } else if (type === "orange") {
    color = "bg-orange-400 text-white";
  } else if (type === "white-orange") {
    color = "border border-orange-400 text-orange-400";
  } else {
    color = "border border-gray-300 text-gray-300";
  }

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-[6px] rounded-[16px] py-[14px] font-semibold md:py-[17px] md:text-lg ${color} ${className}`}
    >
      <p>{text}</p>
      {image && <WritingIcon color={type === "orange" ? "text-white" : "text-gray-300"} />}
    </button>
  );
}

export default Button;
