"use client";

import Image from "next/image";

interface CustomCheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  shape?: "circle" | "square";
  className?: string;
}

export default function CustomCheckbox({ checked, onChange, shape = "circle", className = "" }: CustomCheckboxProps) {
  const wrapperSize = shape === "square" ? "h-[36px] w-[36px]" : "h-[24px] w-[24px]";
  const boxSize = shape === "square" ? "h-[20px] w-[20px]" : "h-[18px] w-[18px]";
  const shapeStyle = shape === "circle" ? "rounded-full" : "rounded-[4px]";
  const iconSize = shape === "square" ? { width: 10, height: 6 } : { width: 8, height: 5 };

  const bgStyle = (() => {
    if (checked) return "bg-orange-400";
    if (shape === "circle") return "border border-line-200";
    return "bg-gray-50 border border-line-200";
  })();

  const isSquare = shape === "square";

  const handleClick = () => {
    if (isSquare && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={`${wrapperSize} flex shrink-0 items-center justify-center ${className}`} onClick={handleClick}>
      <div
        className={`flex items-center justify-center ${boxSize} ${shapeStyle} ${bgStyle} ${
          isSquare ? "cursor-pointer" : "pointer-events-none"
        }`}
      >
        {checked && (
          <Image src="/assets/icons/ic_check.svg" alt="선택됨" width={iconSize.width} height={iconSize.height} />
        )}
      </div>
    </div>
  );
}
