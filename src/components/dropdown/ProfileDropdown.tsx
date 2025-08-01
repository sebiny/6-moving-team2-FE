import Image from "next/image";
import React, { useEffect, useState } from "react";
import icProfile from "/public/assets/icons/ic_profile.svg";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { getProfileDropdownMenu, UserType } from "@/constant/constant";
import { useTranslations } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";

import { authService } from "@/lib/api/api-auth";

interface ProfileProps {
  lg?: string;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export default function Profile({ ref, isOpen, onClick, className, lg }: ProfileProps) {
  const { pushWithTransition } = useTransitionRouter();
  const { user, logout, isLoading } = useAuth();
  const userType = user?.userType;

  const t = useTranslations("Gnb");
  const profileMenu = getProfileDropdownMenu(t);

  const [detailedUser, setDetailedUser] = useState<{ name: string; profileImage: string } | null>(null);

  useEffect(() => {
    // 로그인된 상태일 때만 상세 정보를 가져옵니다.
    if (user) {
      const fetchUserData = async () => {
        const userData = await authService.getMyName();
        setDetailedUser(userData);
      };
      fetchUserData();
    }
  }, [user]); // user 객체가 변경될 때 (로그인/로그아웃 시) 다시 실행

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, path: string) => {
    const buttonElement = event.currentTarget;
    const uniqueName = `gnb-menu-${path.replace("/", "")}`;
    buttonElement.style.viewTransitionName = uniqueName;

    const transition = pushWithTransition(path);
    onClick?.();

    // transition 객체가 존재하면(API가 지원되면)
    if (transition) {
      transition.finished.finally(() => {
        // 애니메이션이 완전히 끝나고 나면 스타일을 제거합니다.
        buttonElement.style.viewTransitionName = "";
      });
    }
  };

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className={`${className} relative flex items-center`} ref={ref}>
      {lg ? (
        <button className="flex cursor-pointer items-center justify-between gap-3" onClick={onClick}>
          <Image
            src={detailedUser?.profileImage ?? icProfile}
            alt="프로필 이미지"
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-full object-cover object-center"
          />
          {isLoading ? (
            <div className="h-5 w-20 animate-pulse rounded bg-gray-300"></div> // 스켈레톤 UI
          ) : (
            (detailedUser?.name ?? "이름없음")
          )}
        </button>
      ) : (
        <button className="cursor-pointer" onClick={onClick}>
          <Image
            src={detailedUser?.profileImage ?? icProfile}
            alt="프로필 이미지"
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-full border object-cover object-center"
          />
        </button>
      )}

      {/* 프로필 레이어 */}
      {isOpen && (
        <div className="text-black-400 border-line-200 absolute top-8 -right-25 z-50 flex w-38 -translate-x-1/3 flex-col rounded-2xl border bg-gray-50 pt-4 pb-1 shadow-gray-300 lg:top-10 lg:w-62 lg:-translate-x-24 2xl:translate-x-5">
          <button className="h-10 items-center pl-4 text-left text-base font-bold lg:h-13 lg:pl-6 lg:text-lg">
            {/* // `${detailedUser?.name ?? "이름없음"} ${user?.userType === "CUSTOMER" ? "고객님" : "기사님"}`  */}

            {isLoading ? (
              <div className="h-5 w-24 animate-pulse rounded bg-gray-300"></div>
            ) : (
              `${detailedUser?.name ?? t("noUser")} ${user?.userType === "CUSTOMER" ? t("customer") : t("driver")}`
            )}
          </button>
          {profileMenu[userType as UserType]?.map(({ label, path }, idx) => (
            <button
              key={idx}
              onClick={(e) => handleMenuClick(e, path)}
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
