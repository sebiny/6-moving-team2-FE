"use client";
import React, { useState } from "react";
import clsx from "clsx";

interface ChipCircleType {
  type: "region" | "address";
  text: string;
  color?: "orange" | "gray";
  click?: boolean;
}

function ChipCircle({ type, color = "gray", text, click = false }: ChipCircleType) {
  const [isClicked, setIsClicked] = useState(false);
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
    setIsClicked((isClicked) => !isClicked);
  };

  return (
    <button className={design} onClick={handleClick} disabled={!click}>
      {text}
    </button>
  );
}

export default ChipCircle;
