// 필터 버튼
import Image from "next/image";
import clsx from "clsx";

interface FilterToggleButtonProps {
  isOpen: boolean;
  onClick?: () => void;
}

export default function FilterToggleButton({ isOpen, onClick }: FilterToggleButtonProps) {
  return (
    <div className="inline-flex items-center justify-center gap-3 lg:hidden">
      <button
        onClick={onClick}
        className={clsx(
          "flex items-center justify-start gap-1.5 rounded-lg p-1 outline-1 outline-offset-[-1px]",
          isOpen
            ? "bg-rose-50 outline-red-500"
            : "bg-white shadow-[4px_4px_10px_0px_rgba(238,238,238,0.10)] outline-zinc-500"
        )}
      >
        <div className="relative h-6 w-6">
          <Image
            src={isOpen ? "assets/icons/ic_filter_red.svg" : "assets/icons/ic_filter_gray.svg"}
            alt="필터"
            fill
            className="object-contain"
          />
        </div>
      </button>
    </div>
  );
}
