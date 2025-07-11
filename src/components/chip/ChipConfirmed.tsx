import React from "react";

export default function ChipConfirmed() {
  return (
    <div className="inline-flex items-center justify-center gap-1 rounded-md py-1 shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)]">
      <div className="relative h-5 w-5 overflow-hidden">
        <div className="absolute top-0 left-0 h-5 w-5" />
        <div className="absolute top-[1.68px] left-[1.68px] h-4 w-4 bg-red-500" />
      </div>
      <div className="justify-center font-['Pretendard'] text-base leading-relaxed font-bold text-red-500">
        확정견적
      </div>
    </div>
  );
}
