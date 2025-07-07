import Image from "next/image";
import React from "react";
import icProfile from "/public/assets/icons/ic_profile.svg";

interface ProfileProps {
  md?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Profile({ isOpen, onToggle, md }: ProfileProps) {
  return (
    <div className="flex items-center">
      {md ? (
        <button className="flex cursor-pointer items-center justify-between gap-3" onClick={onToggle}>
          <Image src={icProfile} alt="프로필 이미지" width={26} height={26} />
          <span className="text-black-500 text-lg font-medium">사용자이름</span>
        </button>
      ) : (
        <button className="cursor-pointer" onClick={onToggle}>
          <Image src={icProfile} alt="프로필 이미지" width={26} height={26} />
        </button>
      )}

      {/* 프로필 레이어 */}
      {isOpen && (
        <div className="border-line-200 absolute top-12 z-99 flex h-48 w-28 -translate-x-13 flex-col rounded-2xl border bg-gray-50 p-4 shadow-gray-300 md:top-18 md:translate-x-0">
          드롭다운 제작중
        </div>
      )}
    </div>
  );
}
