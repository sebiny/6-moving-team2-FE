import Image from "next/image";
import React, { useRef } from "react";
import iconNotification from "/public/assets/icons/ic_alarm.svg";
import ImgXBtn from "/public/assets/icons/ic_X.svg";

interface Notification {
  ref: React.Ref<HTMLDivElement> | undefined;
  isOpen: boolean;
  onClick: () => void;
}
export default function Notification({ ref, onClick, isOpen }: Notification) {
  return (
    <div className="relative z-50 flex" ref={ref}>
      <button onClick={onClick} className="relative cursor-pointer">
        <div className="flax-col relative flex">
          <Image src={iconNotification} alt="알림" height={24} width={24} className="opacity-50" />
          <span className="absolute top-0.5 right-0.5 flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-orange-400"></span>
          </span>
        </div>
      </button>

      {/* 알림 레이어 */}
      {isOpen && (
        <div className="border-line-200 absolute top-8 z-99 flex h-78 w-78 -translate-x-48 flex-col rounded-3xl border bg-gray-50 p-4 shadow-gray-300 lg:top-10 xl:-translate-x-1/10">
          <div className="flex items-center justify-between px-3 py-[10px]">
            <span className="text-black-300 text-base font-bold">알림</span>
            <button className="cursor-pointer" onClick={onClick}>
              <Image src={ImgXBtn} alt="닫는버튼" width={24} height={24} />
            </button>
          </div>
          <div className="overflow-y-auto scroll-smooth">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="text-black-400 border-line-200 flex flex-col gap-[2px] border-b p-3 text-sm font-medium"
              >
                <span>
                  김코드 기사님의 <span className="text-orange-400">소형이사 견적</span>이 도착했어요.
                </span>
                <span className="text-[13px] text-gray-300">2시간 전</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
