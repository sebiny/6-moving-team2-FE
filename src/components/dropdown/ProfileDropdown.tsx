import Image from "next/image";
import React, { useEffect, useState } from "react";
import icProfile from "/public/assets/icons/ic_profile.svg";

import { useRouter } from "next/navigation";

import { getProfileDropdownMenu, UserType } from "@/constant/constant";
import { useTranslations } from "next-intl";

import { useAuth, User } from "@/providers/AuthProvider";

import { authService } from "@/lib/api/api-auth";

interface ProfileProps {
  lg?: string;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export default function Profile({ ref, isOpen, onClick, className, lg }: ProfileProps) {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const userType = user?.userType;

  const t = useTranslations("Gnb");
  const profileMenu = getProfileDropdownMenu(t);

  const [detailedUser, setDetailedUser] = useState<User | null>(null);

  useEffect(() => {
    // 로그인된 상태일 때만 상세 정보를 가져옵니다.
    if (user) {
      const fetchUserData = async () => {
        const userData = await authService.getUserById();
        setDetailedUser(userData);
      };
      fetchUserData();
    }
  }, [user]); // user 객체가 변경될 때 (로그인/로그아웃 시) 다시 실행

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className={`${className} flex items-center`} ref={ref}>
      {lg ? (
        <button className="flex cursor-pointer items-center justify-between gap-3" onClick={onClick}>
          <Image src={icProfile} alt="프로필 이미지" width={26} height={26} />
          {isLoading ? (
            <div className="h-5 w-20 animate-pulse rounded bg-gray-300"></div> // 스켈레톤 UI
          ) : (
            (detailedUser?.name ?? "이름없음")
          )}
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
            {/* // {user?.name ?? t("noUser")} {userType === "CUSTOMER" ? t("customer") : t("driver")} */}

            {isLoading ? (
              <div className="h-5 w-24 animate-pulse rounded bg-gray-300"></div>
            ) : (
              `${detailedUser?.name ?? "이름없음"} ${user?.userType === "CUSTOMER" ? "고객님" : "기사님"}`
            )}
          </button>
          {profileMenu[userType as UserType]?.map(({ label, path }, idx) => (
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
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
