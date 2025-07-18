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
          {isOpen && (
            <div>
              <div className="fixed inset-0 z-50 bg-black/40" aria-hidden="true" onClick={onClick} />
              <div ref={ref}>{children}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
