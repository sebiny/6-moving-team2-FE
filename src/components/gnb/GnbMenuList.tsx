import React from "react";
import { getGnbUserRole } from "@/constant/constant";
import Image from "next/image";
import ImgXBtn from "/public/assets/icons/ic_X.svg";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

interface GnbListProps {
  isOpen?: boolean;
  browserWidth: "lg" | "default";
  userRole?: "GUEST" | "CUSTOMER" | "DRIVER" | undefined;
  onClick?: () => void;
  isLg: boolean;
}

const browserWidthType = {
  lg: {
    layoutDiv: "md:flex-1 lg:ml-20 lg:flex lg:gap-10",
    buttonStyle: "",
    textStyle: "text-lg font-bold"
  },
  default: {
    layoutDiv: "flex h-screen w-55 flex-col bg-gray-50 transition-all transform duration-300 ease-out",
    buttonStyle: "h-18 text-left pl-6",
    textStyle: "text-base font-medium"
  }
};

export default function GnbMenuList({ browserWidth, userRole, onClick, isLg }: GnbListProps) {
  const { pushWithTransition } = useTransitionRouter();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const t = useTranslations("Gnb");
  const profileMenu = getGnbUserRole(t);

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

  return (
    <nav className={`${browserWidthType[browserWidth].layoutDiv}`}>
      {browserWidth === "default" && (
        <button className="flex h-15 w-full cursor-pointer justify-end px-4 py-[10px]" onClick={onClick}>
          <Image src={ImgXBtn} alt="닫는버튼" width={24} height={24} />
        </button>
      )}
      {profileMenu[userRole as keyof typeof profileMenu].map(({ label, path }, idx) => (
        <button
          key={idx}
          onClick={(e) => handleMenuClick(e, path)}
          className={`${browserWidthType[browserWidth].buttonStyle} cursor-pointer`}
        >
          <span
            className={
              label.includes(t("login"))
                ? isLg || isLoggedIn
                  ? "hidden"
                  : "block"
                : `${browserWidthType[browserWidth].textStyle} text-black-500`
            }
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
