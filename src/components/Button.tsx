import Image from "next/image";
import React from "react";
import WritingIcon from "./icon/WritingIcon";

interface ButtonType {
  text: string;
  round?: 12 | 16;
  type: "orange" | "gray" | "white-orange" | "white-gray";
  image?: boolean;
}

function Button({ text, type, round = 16, image = false }: ButtonType) {
  let color = "";
  if (type === "orange") {
    color = "bg-orange-400 text-white";
  } else if (type === "gray") {
    color = "bg-gray-100 text-white";
  } else if (type === "white-orange") {
    color = "border border-orange-400 text-orange-400";
  } else {
    color = "border border-gray-300 text-gray-300";
  }
  const roundClass = round === 12 ? "rounded-[12px]" : "rounded-[16px]";

  const isDisabled = type === "gray";
  return (
    <button
      disabled={isDisabled}
      className={`w-full gap-[6px] py-4 text-lg font-semibold ${roundClass} ${color} items-centergap-2 flex cursor-pointer justify-center`}
    >
      <p>{text}</p>
      {image && <WritingIcon />}
    </button>
  );
}

export default Button;
