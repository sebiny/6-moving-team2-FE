import React from "react";
import Image from "next/image";

interface ChipConfirmedProps {
  className?: string;
}

export default function ChipConfirmed({ className = "" }: ChipConfirmedProps) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-1 rounded-md py-1 shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)] ${className}`}
    >
      <Image src="/assets/icons/ic_frame.svg" alt="확정견적 아이콘" width={20} height={20} className="mr-1" />
      <div className="justify-center font-['Pretendard'] text-base leading-relaxed font-bold text-red-500">
        확정견적
      </div>
    </div>
  );
}
