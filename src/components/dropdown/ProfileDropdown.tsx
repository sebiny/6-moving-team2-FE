import Image from "next/image";
import React from "react";
import icProfile from "/public/assets/icons/ic_profile.svg";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { authService } from "@/lib/api/api-auth";

interface ProfileProps {
  lg?: string;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const MYPAGE_CUSTOMER = [
  { label: "프로필 수정", path: "/" },
  { label: "찜한 기사님", path: "/" },
  { label: "이사 리뷰", path: "/review" }
];

const API_PATH = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Profile({ ref, isOpen, onClick, className, lg }: ProfileProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className={`${className} flex items-center`} ref={ref}>
      {lg ? (
        <button className="flex cursor-pointer items-center justify-between gap-3" onClick={onClick}>
          <Image src={icProfile} alt="프로필 이미지" width={26} height={26} />
          <span className="text-black-500 text-lg font-medium">{user?.name ? user?.name : "이름없음"}</span>
        </button>
      ) : (
        <button className="cursor-pointer" onClick={onClick}>
          <Image src={icProfile} alt="프로필 이미지" width={26} height={26} />
        </button>
      )}

      {/* 프로필 레이어 */}
      {isOpen && (
        <div className="text-black-400 border-line-200 absolute top-12 z-99 flex w-38 -translate-x-1/2 flex-col rounded-2xl border bg-gray-50 pt-4 pb-1 shadow-gray-300 lg:top-18 lg:w-62 lg:-translate-x-36 xl:translate-x-0">
          <button className="h-10 items-center pl-4 text-left text-base font-bold lg:h-13 lg:pl-6 lg:text-lg">
            {user?.name ?? "이름없음"} 고객님
          </button>
          {MYPAGE_CUSTOMER.map(({ label, path }, idx) => (
            <button
              key={idx}
              onClick={() => router.push(path)}
              className="h-10 cursor-pointer items-center pl-4 text-left text-sm hover:bg-orange-50 lg:h-13 lg:pl-6 lg:text-base"
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="border-line-100 mt-1 h-10 cursor-pointer border-t text-xs text-gray-500 lg:h-13 lg:text-sm"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
