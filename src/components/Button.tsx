import Image from "next/image";
import React from "react";

interface ButtonType {
  text: string;
  round: string;
  type: "orange" | "gray" | "white-orange" | "white-gray";
  size?: string;
  image?: boolean;
}

function Button({ text, type, round = "16", image = false, size = "" }: ButtonType) {
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
  return (
    <button className={`w-full py-4 text-lg font-semibold rounded-[${round}px] ${color} ${size}`}>
      <p>{text}</p>
      {image && <Image src="/assets/icons/ic_writing.svg" alt="작성하기" />}
    </button>
  );
}

export default Button;
