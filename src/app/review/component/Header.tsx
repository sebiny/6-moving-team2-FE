import React from "react";
import { clsx } from "clsx";
export default function Header() {
  const REVIEW_LIST = [
    { idx: "1", label: "작성 가능한 리뷰", active: true },
    { idx: "2", label: "내가 작성한 리뷰", active: false }
  ]; //array
  const SIZE_CLASSES = {
    base: ["2xl:px-[360px] 2xl:pt-4  2xl:gap-8"],
    sm: ["sm:gap-6 sm:px-6"],
    md: ["md:gap-6 md:px-18"]
  }; //object
  return (
    <div>
      <div
        className={clsx(
          "border-line-100 flex items-start border-b-1 bg-gray-50 pb-0 shadow-[0px_2px_10px_rgba(248,248,248,0.10)]",
          ...SIZE_CLASSES.base,
          ...SIZE_CLASSES.md,
          ...SIZE_CLASSES.sm
        )}
      >
        {REVIEW_LIST.map(({ idx, label, active }) => (
          <div
            key={idx}
            className={clsx(
              "flex items-center justify-center gap-6 self-stretch py-4",
              active && "border-black-500 border-b-[2px]"
            )}
          >
            <p
              className={clsx(
                active ? "text-black-500" : "text-gray-400",
                "leading-[32px] font-semibold sm:font-[Pretendard] sm:text-[14px] md:text-[14px] 2xl:text-[20px]"
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
