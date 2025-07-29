import React from "react";
import WritingIcon from "./icon/WritingIcon";

interface ButtonType {
  text: string;
  type: "orange" | "gray" | "white-orange" | "white-gray" | "outline";
  image?: boolean;
  className?: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "button" | "submit"; // 버튼 타입 추가
}

function Button({
  text,
  type,
  image = false,
  className = "w-full",
  isDisabled = false,
  onClick,
  buttonType = "submit" //수정
}: ButtonType) {
  let color = "";
  if (type === "gray" || isDisabled) {
    color = "bg-gray-100 text-white";
  } else if (type === "orange") {
    color = "bg-orange-400 text-white";
  } else if (type === "white-orange") {
    color = "border border-orange-400 text-orange-400";
  } else if (type === "outline") {
    color = "bg-rose-50 border border-red-500 text-red-500 shadow-[4px_4px_10px_0px_rgba(195,217,242,0.20)]";
  } else {
    color = "border border-gray-300 text-gray-300";
  }

  return (
    <button
      type={buttonType} //수정
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
