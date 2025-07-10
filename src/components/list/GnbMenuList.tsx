import React from "react";
import { GNB_ROUTE_USER_ROLE } from "@/constant/constant";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImgXBtn from "/public/assets/icons/ic_X.svg";

interface GnbListProps {
  isOpen?: boolean;
  browserWidth: "lg" | "default";
  userRole?: "guest" | "customer" | "driver" | undefined;
  onClick?: () => void;
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

export default function GnbMenuList({ browserWidth, userRole, onClick }: GnbListProps) {
  const router = useRouter();
  return (
    <div className={`${browserWidthType[browserWidth].layoutDiv}`}>
      {browserWidth === "default" && (
        <button className="flex h-15 w-full cursor-pointer justify-end px-4 py-[10px]" onClick={onClick}>
          <Image src={ImgXBtn} alt="닫는버튼" width={24} height={24} />
        </button>
      )}
      {GNB_ROUTE_USER_ROLE[userRole as keyof typeof GNB_ROUTE_USER_ROLE].map(({ label, path }, idx) => (
        <button
          key={idx}
          onClick={() => {
            router.push(path);
            onClick?.();
          }}
          className={`${browserWidthType[browserWidth].buttonStyle} cursor-pointer`}
        >
          <span className={`${browserWidthType[browserWidth].textStyle} text-black-500`}>{label}</span>
        </button>
      ))}
    </div>
  );
}
