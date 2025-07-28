"use client";

import { useTranslations } from "next-intl";
import React, { use } from "react";

interface EstimateDetailProps {
  moveType: string;
  startAddress: string;
  endAddress: string;
  date: string;
  createdDate: string;
}

export default function EstimateDetail({ moveType, startAddress, endAddress, date, createdDate }: EstimateDetailProps) {
  const t = useTranslations("MyEstimates");
  return (
    <div className="w-full rounded-xl bg-white md:pb-7">
      {/* 상단: 제목 + 생성일 */}
      <div className="mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row">
        <h2 className="text-lg font-bold text-gray-900 md:text-xl">{t("estimateInfo")}</h2>
        <p className="mt-2 hidden text-sm text-gray-400 md:mt-0 md:flex">{createdDate}</p>
      </div>

      {/* 본문 정보 */}
      <div className="space-y-3 text-sm md:text-base">
        <div className="flex justify-between">
          <span className="font-bold text-orange-400">{t("moveType")}</span>
          <span className="font-semibold">{moveType}</span>
        </div>

        <hr className="border-t border-gray-100 lg:hidden" />

        <div className="flex justify-between">
          <span className="font-bold text-orange-400">{t("from")}</span>
          <span className="max-w-[60%] truncate font-semibold">{startAddress}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-orange-400">{t("to")}</span>
          <span className="max-w-[60%] truncate font-semibold">{endAddress}</span>
        </div>

        <hr className="border-t border-gray-100 lg:hidden" />

        <div className="flex justify-between">
          <span className="font-bold text-orange-400">{t("date")}</span>
          <span className="font-semibold">{date}</span>
        </div>
      </div>

      {/* 하단 날짜 (sm 전용) */}
      <p className="mt-5 text-right text-sm text-gray-400 md:hidden">{createdDate}</p>
    </div>
  );
}

// truncate: overflow-hidden + whitespace-nowrap + text-ellipsis Tailwind 유틸
//  두 줄까지만 보여주고 넘치면 ... 처리하고 싶다면 line-clamp-2
