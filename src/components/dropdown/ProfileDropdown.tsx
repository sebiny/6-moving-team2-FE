import Image from "next/image";
import React from "react";
import icProfile from "/public/assets/icons/ic_profile.svg";

import { useRouter } from "next/navigation";

interface ProfileProps {
  md?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const MYPAGE_CUSTOMER = [
  { label: "프로필 수정", path: "./" },
  { label: "찜한 기사님", path: "./" },
  { label: "이사 리뷰", path: "./" }
];

export default function Profile({ isOpen, onToggle, md }: ProfileProps) {
  const router = useRouter();
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
        <div className="text-black-400 border-line-200 absolute top-12 z-99 flex w-38 -translate-x-1/2 flex-col rounded-2xl border bg-gray-50 pt-4 pb-1 shadow-gray-300 md:top-18 md:w-62 md:-translate-x-1/2 xl:translate-x-0">
          <button className="h-10 items-center pl-4 text-left text-base font-bold md:h-13 md:pl-6 md:text-lg">
            사용자이름 고객님
          </button>
          {MYPAGE_CUSTOMER.map(({ label, path }, idx) => (
            <button
              key={idx}
              onClick={() => router.push(path)}
              className="h-10 cursor-pointer items-center pl-4 text-left text-sm hover:bg-orange-50 md:h-13 md:pl-6 md:text-base"
            >
              {label}
            </button>
          ))}
          <button className="border-line-100 mt-1 h-10 cursor-pointer border-t text-xs text-gray-500 md:h-13 md:text-sm">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
