import React from "react";
import { getGnbUserRole } from "@/constant/constant";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImgXBtn from "/public/assets/icons/ic_X.svg";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

interface GnbListProps {
  isOpen?: boolean;
  browserWidth: "lg" | "default";
  userRole?: "guest" | "CUSTOMER" | "DRIVER" | undefined;
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
    layoutDiv: "fixed top-0 right-0 z-50 flex h-screen w-full flex-col bg-gray-50 transition-all sm:w-full md:w-55",
    buttonStyle: "h-18 text-left pl-6",
    textStyle: "text-base font-medium"
  }
};

export default function GnbMenuList({ browserWidth, userRole, onClick, isLg }: GnbListProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const t = useTranslations("Gnb");
  const profileMenu = getGnbUserRole(t);
  return (
    <div className={`${browserWidthType[browserWidth].layoutDiv}`}>
      {browserWidth === "default" && (
        <button className="flex h-15 w-full cursor-pointer justify-end px-4 py-[10px]" onClick={onClick}>
          <Image src={ImgXBtn} alt="닫는버튼" width={24} height={24} />
        </button>
      )}
      {profileMenu[userRole as keyof typeof profileMenu].map(({ label, path }, idx) => (
        <button
          key={idx}
          onClick={() => {
            router.push(path);
            onClick?.();
          }}
          className={`${browserWidthType[browserWidth].buttonStyle} cursor-pointer`}
        >
          <span
            className={
              label === "로그인"
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
    </div>
  );
}
