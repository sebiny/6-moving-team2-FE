import Image from "next/image";
import MenuButton from "/public/assets/icons/ic_menu.svg";
import { ReactNode } from "react";

interface GnbListProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  children?: ReactNode;
  lg?: "lg";
  className?: string;
  isOpen?: boolean;
  onClick?: () => void;
}
export default function GnbListLayout({ ref, className, children, lg, isOpen, onClick }: GnbListProps) {
  return (
    <div className={`${className}`}>
      {lg ? (
        <div>{children}</div>
      ) : (
        <div className="relative flex items-center justify-between">
          <button className="cursor-pointer" onClick={onClick}>
            <Image src={MenuButton} alt="메뉴 버튼" height={26} width={26} />
          </button>
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-out ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
            aria-hidden="true"
            onClick={onClick}
          />

          {/* 메뉴 컨테이너 - 우측에서 좌측으로 슬라이드 */}
          <div
            className={`fixed top-0 right-0 z-50 h-full transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"} `}
            ref={ref}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
