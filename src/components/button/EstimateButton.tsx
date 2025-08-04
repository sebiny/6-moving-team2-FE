import React, { useState } from "react";
import WritingIcon from "../icon/WritingIcon";

interface EstimateButtonProps {
  text: string;
  type: "orange" | "gray" | "white-orange" | "white-gray" | "outline";
  image?: boolean;
  className?: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "button" | "submit";
  estimateCount?: number; // 견적 개수
}

function EstimateButton({
  text,
  type,
  image = false,
  className = "w-full",
  isDisabled = false,
  onClick,
  buttonType = "submit",
  estimateCount = 0
}: EstimateButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  // 견적 개수가 0이면 호버 효과 없음
  const showHoverEffect = estimateCount > 0;

  return (
    <button
      type={buttonType}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => showHoverEffect && setIsHovered(true)}
      onMouseLeave={() => showHoverEffect && setIsHovered(false)}
      className={`flex h-[48px] cursor-pointer items-center justify-center gap-[6px] rounded-[16px] py-[14px] font-semibold transition-all duration-200 md:h-[56px] md:py-[17px] md:text-lg ${color} ${className}`}
    >
      <p className="transition-opacity duration-200">
        {showHoverEffect && isHovered ? `${estimateCount}명의 기사님이 보냈습니다` : text}
      </p>
      {image && (!showHoverEffect || !isHovered) && (
        <WritingIcon color={type === "orange" ? "text-white" : "text-gray-300"} />
      )}
    </button>
  );
}

export default EstimateButton;
