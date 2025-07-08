"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

type HeaderType = "review" | "estimate";

interface HeaderProps {
  type: HeaderType;
}
interface TabItem {
  idx: string;
  label: string;
  active: boolean;
}

export default function Header({ type }: HeaderProps) {
  const REVIEW_LIST: TabItem[] = [
    { idx: "1", label: "작성 가능한 리뷰", active: true },
    { idx: "2", label: "내가 작성한 리뷰", active: false }
  ]; //array
  const ESTIMATE_LIST: TabItem[] = [
    { idx: "1", label: "대기 중인 견적", active: true },
    { idx: "2", label: "받았던 견적", active: false }
  ];
  const [tabList, setTabList] = useState<TabItem[]>(type === "estimate" ? ESTIMATE_LIST : REVIEW_LIST);
  const SIZE_CLASSES = {
    base: ["lg:px-90 lg:gap-8 lg:pt-26"],
    sm: ["sm:gap-6 sm:px-6 sm:pt-[54px]"],
    md: ["md:gap-6 md:px-18"]
  }; //object

  const handleTabClick = (clickedIdx: string) => {
    setTabList((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.idx === clickedIdx
      }))
    );
  };
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
        {tabList.map(({ idx, label, active }) => (
          <div
            key={idx}
            className={clsx(
              "flex items-center justify-center gap-6 self-stretch py-[15px] lg:py-4",
              active && "border-black-500 border-b-[2px]",
              "cursor-pointer"
            )}
            onClick={() => handleTabClick(idx)}
          >
            <p
              className={clsx(
                active ? "text-black-500" : "text-gray-400",
                "leading-[32px] font-semibold sm:font-[Pretendard] sm:text-[14px] md:text-[14px] lg:text-[20px]"
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
