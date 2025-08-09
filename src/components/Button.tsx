import React, { ReactNode, forwardRef } from "react";
import WritingIcon from "./icon/WritingIcon";

interface ButtonProps {
  text: string | ReactNode;
  type: "orange" | "gray" | "white-orange" | "white-gray" | "outline";
  image?: boolean;
  className?: string;
  isLoginText?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "button" | "submit";
}

// forwardRef 적용
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      type,
      image = false,
      isLoginText = false,
      className = "w-full",
      isDisabled = false,
      onClick,
      buttonType = "submit"
    },
    ref
  ) => {
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
        ref={ref}
        type={buttonType}
        disabled={isDisabled}
        onClick={onClick}
        className={`flex h-[48px] cursor-pointer items-center justify-center gap-[6px] rounded-[16px] py-[14px] font-semibold md:py-[17px] md:text-lg ${color} ${className} ${
          isLoginText ? "md:h-[44px]" : "md:h-[56px]"
        } ${color}`}
      >
        {text}
        {image && <WritingIcon color={type === "orange" ? "text-white" : "text-gray-300"} />}
      </button>
    );
  }
);

// 디버깅 편하게 이름 지정
Button.displayName = "Button";

export default Button;
