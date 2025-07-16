import React from "react";
import Image from "next/image";

export default function ConfirmedEstimate() {
  return (
    <div className="inline-flex items-center justify-center gap-1 rounded-md py-1 shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)]">
      <div className="w-5 h-5 relative overflow-hidden">
        <div className="w-5 h-5 left-0 top-0 absolute" />
        <div className="w-4 h-4 left-[1.68px] top-[1.68px] absolute bg-red-500 flex items-center justify-center">
          <Image 
            src="/assets/icons/ic_frame.svg" 
            alt="확정" 
            width={12} 
            height={12}
          />
        </div>
      </div>
      <div className="justify-center font-['Pretendard'] text-base leading-relaxed font-bold text-red-500">
        확정견적
      </div>
    </div>
  );
}