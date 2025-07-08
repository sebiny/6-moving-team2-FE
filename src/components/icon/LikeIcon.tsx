import React from "react";

interface LikeIconType {
  size?: number;
  color?: "red" | "black" | "gray";
  isFilled?: boolean;
}

function LikeIcon({ size = 24, color = "black", isFilled = true }: LikeIconType) {
  let iconColor = "";
  if (color === "black") {
    iconColor = "text-black-500";
  } else if (color === "gray") {
    iconColor = "text-gray-100";
  } else {
    iconColor = "text-[#FF4F64]";
  }
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 14.6382C8 19.5006 15 24.5655 15 24.5655C15 24.5655 17 26 18 26C19 26 21 24.5655 21 24.5655C21 24.5655 28 19.5006 28 14.6382C28 9.7757 22.5 6.39573 18 11.6554C13.5 6.39573 8 9.7757 8 14.6382Z"
        fill={isFilled ? "currentColor" : "white"}
        stroke="currentColor"
        strokeWidth={2}
        className={iconColor}
      />
    </svg>
  );
}

export default LikeIcon;
