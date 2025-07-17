"use client";

import React from "react";
import { clsx } from "clsx";

type HeaderType = "review" | "estimate" | "driver-estimate";

interface HeaderProps {
  type: HeaderType;
  selectedIdx: string;
  setSelectedIdx: (idx: string) => void;
}
interface TabItem {
  idx: string;
  label: string;
}

export default function Header({ type, selectedIdx, setSelectedIdx }: HeaderProps) {
  // 탭 항목 정의
  const rawList: TabItem[] =
    type === "estimate"
      ? [
          { idx: "1", label: "대기 중인 견적" },
          { idx: "2", label: "받았던 견적" }
        ]
      : type === "driver-estimate"
        ? [
            { idx: "sent", label: "보낸 견적 조회" },
            { idx: "rejected", label: "반려 요청" }
          ]
        : [
            { idx: "1", label: "작성 가능한 리뷰" },
            { idx: "2", label: "내가 작성한 리뷰" }
          ];
  const tabList = rawList.map((item) => ({
    ...item,
    active: item.idx === selectedIdx
  }));
  const SIZE_CLASSES = {
    base: ["lg:px-90 lg:gap-8 lg:pt-4"],
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
        {tabList.map(({ idx, label, active }) => (
          <div
            key={idx}
            className={clsx(
              "flex items-center justify-center gap-6 self-stretch sm:py-[10px] md:py-[15px] lg:py-4",
              active && "border-black-500 border-b-[2px]",
              "cursor-pointer"
            )}
            onClick={() => setSelectedIdx(idx)}
          >
            <p
              className={clsx(
                active ? "text-black-500" : "text-gray-400",
                "text-[14px] leading-[24px] font-semibold lg:text-[20px] lg:leading-[32px]"
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
