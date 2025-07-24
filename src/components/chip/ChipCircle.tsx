"use client";
import React, { useState } from "react";
import clsx from "clsx";

interface ChipCircleType {
  type: "region" | "address";
  text: string;
  color?: "orange" | "gray";
  click?: boolean;
  isSelected?: boolean;
  onSelect?: (text: string) => void;
}

function ChipCircle({ type, color = "gray", text, click = false, isSelected = false, onSelect }: ChipCircleType) {
  const [internalClicked, setInternalClicked] = useState(false);
  
  // 외부에서 제어하는 경우 isSelected 사용, 내부 제어하는 경우 internalClicked 사용
  const isClicked = onSelect ? isSelected : internalClicked;
  const design = clsx(
    " flex items-center justify-center",
    type === "address"
      ? "bg-orange-100 text-orange-400 text-xs md:text-sm h-6 md:h-7 w-[44px] md:w-[54px] font-semibold rounded-[16px]"
      : [
          "w-auto inline-flex rounded-[100px] border",
          click
            ? isClicked
              ? " border-orange-400 bg-orange-100 text-orange-400 font-medium"
              : "bg-background-100 text-black-400 border-gray-100"
            : color === "gray"
              ? " bg-background-100 text-black-400 border-gray-100"
              : " border-orange-400 bg-orange-100 text-orange-400 font-medium",
          click
            ? "px-3 py-[6px] text-sm lg:px-5 lg:py-[10px] lg:text-lg"
            : "px-3 py-[6px] text-sm md:px-5 md:py-[10px] md:text-lg"
        ]
  );

  const handleClick = () => {
    if (onSelect) {
      onSelect(text);
    } else {
      setInternalClicked((prev) => !prev);
    }
  };

  return (
    <button className={design} onClick={handleClick} disabled={!click}>
      {text}
    </button>
  );
}

export default ChipCircle;
