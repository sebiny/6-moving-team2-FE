"use client";

import React from "react";
import { clsx } from "clsx";
import { useTranslations } from "next-intl"; //다국어 훅 추가

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
  const t = useTranslations("Review");
  //'Review' 네임스페이스로 번역
  //Review.json 파일 참조

  // 탭 항목 정의
  const rawList: TabItem[] =
    type === "estimate"
      ? [
          { idx: "1", label: t("estimate.waiting") },
          { idx: "2", label: t("estimate.received") }
        ]
      : type === "driver-estimate"
        ? [
            { idx: "sent", label: t("driverEstimate.sent") },
            { idx: "rejected", label: t("driverEstimate.rejected") }
          ]
        : [
            { idx: "1", label: t("review.writable") },
            { idx: "2", label: t("review.written") }
          ];

  const tabList = rawList.map((item) => ({
    ...item,
    active: item.idx === selectedIdx
  }));

  const SIZE_CLASSES = {
    // base: [""],
    // sm: ["sm: sm:px-6 sm:w-full"],
    // md: ["md: md:px-18 md:w-full"]
    base: ["lg:gap-8 lg:pt-4 lg:h-20"],
    sm: ["sm:gap-6 "],
    md: ["md:gap-6 "]
  };

  return (
    <div className="border-line-100 flex items-center justify-center border-b-1 bg-gray-50 pb-0 shadow-[0px_2px_10px_rgba(248,248,248,0.10)]">
      <div
        className={clsx(
          "flex h-[54px] w-full max-w-[var(--container-gnb)] min-w-[375px] flex-row items-start px-6 lg:pl-55 xl:pl-49",
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
